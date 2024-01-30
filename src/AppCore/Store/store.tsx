import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
  Dispatch,
} from 'react';
import apiService from '../Api/movieApi';
import {
  debounce,
  filterFunc,
  moviesEnrichFunction,
  simplifyResults,
  sortFunc,
} from './utils';
import { SimpleMovieType } from '../genericTypes';

export type DebounceFilterMoviesProps = {
  (value: string): void;
  cancel: () => void;
};

export type StoreType = {
  movies: SimpleMovieType[];
  setMovies: Dispatch<React.SetStateAction<SimpleMovieType[]>>;
  errorMessage: string;
  setErrorMessage: Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  detailsLoading: boolean;
  handleSort: (sortBy: string) => void;
  debouncedFilterMovies: DebounceFilterMoviesProps;
  movieSelector: (episodeId: string) => SimpleMovieType;
};
export const StoreContext = createContext<StoreType | null>(null);

type StoreProviderProps = {
  children: React.JSX.Element;
};

/**
 * Provides a React context for storing and managing the state of movies,
 * including fetching, sorting, filtering, and selecting movies.
 * It also manages loading states and error messages, with state persistence through localStorage.
 */
export const StoreProvider = ({ children }: StoreProviderProps) => {
  const localStorageM = localStorage.getItem('storedMovies');
  const localStorageMovies = localStorageM ? JSON.parse(localStorageM) : null;
  const movieDetailsFetched =
    localStorage.getItem('movieDetailsFetched') === 'true';

  const [movies, setMovies] = useState(localStorageMovies);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(!localStorageMovies);
  const [detailsLoading, setDetailsLoading] = useState(!movieDetailsFetched);

  /**
   * This hook fetches movies on initial render if not present in local storage.
   * Sets a loading state, requests movie data from an external API, simplifies
   * the results and updates both the state and local storage. If an error occurs,
   * an error message is set. Finally loading state is reset
   */
  useEffect(() => {
    const fetchData = async () => {
      if (!localStorageMovies) {
        setLoading(true);
        try {
          const data = await apiService.fetchData(
            'https://swapi.dev/api/films/?format=json'
          );
          const simplifiedResults = simplifyResults(data.results);
          setMovies(simplifiedResults);
          localStorage.setItem(
            'storedMovies',
            JSON.stringify(simplifiedResults)
          );
          localStorage.setItem('lastFetchedTime', Date.now().toString());
        } catch (error) {
          setErrorMessage(
            'Something went wrong while trying to fetch the star wars movies. Please reload the page or try again later.'
          );
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [localStorageMovies]);

  /**
   * This hook fetches additional movie details if not already fetched.
   * This effect runs when `movies` or `movieDetailsFetched` change.
   * If movie details haven't been fetched, it sets loading state,
   * retrieves details for each movie from an external API, enriches
   * the movie data, and then updates the state and local storage.
   * On failure, sets an error message and resets the loading state.
   */
  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (movies && !movieDetailsFetched) {
        setDetailsLoading(true);
        try {
          const detailsPromises = movies.map((movie: SimpleMovieType) => {
            return apiService.fetchData(
              `https://www.omdbapi.com/?t=${movie.title}&apikey=${process.env.REACT_APP_OMDB_API_KEY}&y=${movie.release_year}&plot=full`
            );
          });
          const details = await Promise.all(detailsPromises);

          const enrichedMovies = moviesEnrichFunction(movies, details);
          setMovies(enrichedMovies);
          localStorage.setItem('storedMovies', JSON.stringify(enrichedMovies));
          localStorage.setItem('movieDetailsFetched', 'true');
          setDetailsLoading(false);
        } catch (error) {
          setErrorMessage(
            'Something went wrong while trying to fetch movie details. Please reload the page or try again later.'
          );
        } finally {
          setDetailsLoading(false);
        }
      }
    };

    fetchMovieDetails();
  }, [movieDetailsFetched, movies]);

  /**
   * Function that handles the sorting of the movies
   * @param sortBy  {String} identifier of the sorting type by which the movies will be sorted
   */
  const handleSort = (sortBy: string) => {
    setMovies((prevMovies: SimpleMovieType[]) => {
      return sortFunc([...prevMovies], sortBy);
    });
  };
  /**
   * Function that updates movies state  after filterFunc filtered it
   * @param filterBy  {String} identifier of what filtering should filterFunc apply
   */
  const filterMovies = (filterBy: string) => {
    setMovies(() => {
      return filterFunc(filterBy);
    });
  };

  /**
   * Hook that wraps filterMovies with the debounce function
   * @type {function(...[*]=): void}
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFilterMovies: DebounceFilterMoviesProps = useCallback(
    debounce((value: string) => {
      filterMovies(value);
    }, 250),
    []
  );

  /**
   * Hook used for cleanup for the debounced filter function
   * This hook ensures that when the component unmounts
   * the function is cancelled so to avoid memory leaks
   */
  useEffect(() => {
    return () => {
      debouncedFilterMovies.cancel();
    };
  }, [debouncedFilterMovies]);

  /**
   * Selector function gets a movie from movies using the episode_id
   * @param episodeId {String} identifier of the star wars movie
   * @returns {*|{}}
   */
  const movieSelector = (episodeId: string): SimpleMovieType =>
    movies
      ? movies.find(
          (movie: SimpleMovieType) => movie.episode_id === parseInt(episodeId)
        )
      : {};

  const store: StoreType = {
    movies,
    setMovies,
    errorMessage,
    setErrorMessage,
    loading,
    detailsLoading,
    handleSort,
    debouncedFilterMovies,
    movieSelector,
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

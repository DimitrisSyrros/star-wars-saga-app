import React, { createContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import apiService from '../Api/movieApi';
import {
  debounce,
  filterFunc,
  moviesEnrichFunction,
  simplifyResults,
  sortFunc,
} from './utils';

export const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const localStorageMovies = localStorage.getItem('storedMovies')
    ? JSON.parse(localStorage.getItem('storedMovies'))
    : null;
  const movieDetailsFetched =
    localStorage.getItem('movieDetailsFetched') === 'true';

  const [movies, setMovies] = useState(localStorageMovies);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(!localStorageMovies);
  const [detailsLoading, setDetailsLoading] = useState(!movieDetailsFetched);

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
        } catch (error) {
          setErrorMessage(
            'Something went wrong while trying to fetch the star wars movies.'
          );
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [localStorageMovies]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (movies && !movieDetailsFetched) {
        setDetailsLoading(true);
        try {
          const detailsPromises = movies.map((movie) => {
            return apiService.fetchData(
              `https://www.omdbapi.com/?t=${movie.title}&apikey=4bc82468&y=${movie.release_year}&plot=full`
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
            'Something went wrong while trying to fetch movie details.'
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
  const handleSort = (sortBy) => {
    setMovies((prevMovies) => {
      return sortFunc([...prevMovies], sortBy);
    });
  };

  const filterMovies = (filterBy) => {
    setMovies(() => {
      return filterFunc(filterBy);
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFilterMovies = useCallback(
    debounce((value) => {
      filterMovies(value);
    }, 250),
    []
  );

  useEffect(() => {
    return () => {
      debouncedFilterMovies.cancel();
    };
  }, [debouncedFilterMovies]);

  const movieSelector = (episodeId) =>
    movies ? movies.find((movie) => movie.episode_id === episodeId) : {};

  const store = {
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

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

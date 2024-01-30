import {
  DetailsPerMovieType,
  PercentileRatingsType,
  SimpleMovieType,
} from '../genericTypes';
import { ExportedMovieType } from '../genericTypes';

/**
 * Function that takes in the response from fetching the movies and maps to an array the only pertinent data
 * @param results The results array from the fetch movies call response
 * @returns SimpleMovieType
 */
export const simplifyResults = (results: ExportedMovieType[]) =>
  results.map((movie: ExportedMovieType): SimpleMovieType => {
    return <SimpleMovieType>{
      episode_id: movie.episode_id,
      title: movie.title,
      release_date: movie.release_date,
      release_year: new Date(movie.release_date).getFullYear(),
    };
  });

/**
 * Resolves the option values with the actual movie values
 */
const byFieldResolver: { [index: string]: keyof SimpleMovieType } = {
  year: 'release_year',
  episode: 'episode_id',
  rating: 'ratingAverage',
};
/**
 * Sorting function depending on the first half of the sortBy param
 * it chooses the field by which movies will be sorted
 * and if the second half is asc it applies ascending sorting
 * or descending and returns the movies
 * @param movies  The movies to be sorted
 * @param sortBy  The option value from the @{see Sorter} select that determines
 * what sorting will occur
 * @returns {*}
 */

export const sortFunc = (
  movies: SimpleMovieType[],
  sortBy: string
): SimpleMovieType[] => {
  const parts = sortBy.split('-');
  const byField: keyof SimpleMovieType = byFieldResolver[parts[0]];
  if (parts[1] === 'asc') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return movies.sort((a, b) => a[byField] - b[byField]);
  } else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return movies.sort((a, b) => b[byField] - a[byField]);
  }
};

/**
 * Function that uses the locally stored movies to apply filtering
 * by the movie title
 * @param filterBy  The string that is typed in by the user
 * @returns {*[]|any}
 */
export const filterFunc = (filterBy: string): SimpleMovieType[] => {
  const localStorageM = localStorage.getItem('storedMovies');
  const localStorageMovies = localStorageM ? JSON.parse(localStorageM) : [];
  return filterBy
    ? localStorageMovies.filter((movie: SimpleMovieType) =>
        movie.title.toLowerCase().includes(filterBy.toLowerCase())
      )
    : localStorageMovies;
};

/**
 * Function that limits the rate of execution of a particular function as it forces
 * the function to wait a certain amount of time before running again
 * Because the debounce function returns a new function on every rendering it should be used along with the
 * useCallback effect. e.g. useCallback(debounce(handleChange), [])
 *
 * @param {Function} func   the function which you want to debounce
 * @param {Number} timeout  the amount of time (ms) the function needs to wait before running again
 * @returns {function(...[*]=): void}
 */
export const debounce = (func: any, timeout: number) => {
  let timer: NodeJS.Timeout | null;
  const debouncedFunction = function (this: any, ...args: any[]) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, timeout);
  };
  debouncedFunction.cancel = function () {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };
  return debouncedFunction;
};

/**
 * Function that takes in a rating and returns the rounded percentile version of it
 * @param rating  {String} a movie rating
 * @returns {number}
 */
export const percentileConvertor = (rating: string): number => {
  if (rating.includes('%')) {
    return Math.round(parseFloat(rating));
  } else {
    const [score, outOf] = rating.split('/');
    return Math.round((parseFloat(score) / parseFloat(outOf)) * 100);
  }
};

/**
 * Function that receives a ratings array and calculates their average
 * @param ratings The ratings array
 * @returns {number}
 */
export const averageRatingCalculator = (
  ratings: PercentileRatingsType[]
): number => {
  const total = ratings.reduce((acc, curr) => acc + curr.value, 0);
  const ratingPercentile = Math.round(total / ratings.length);
  return (ratingPercentile / 100) * 10;
};

/**
 * This function takes in a movies array and an array of their corresponding details
 * For each rating of each movie gets the percentiles of their ratings and calculates their average
 * Then enriches the movie object and at the end returns the enriched array
 * @param movies  The movies array
 * @param detailsPerMovie The details array
 * @returns {*}
 */
export const moviesEnrichFunction = (
  movies: SimpleMovieType[],
  detailsPerMovie: DetailsPerMovieType[]
): SimpleMovieType[] => {
  return movies.map((movie) => {
    const match = detailsPerMovie.find((item) =>
      item.Title.includes(movie.title)
    );
    if (match) {
      const percentileRatings = match.Ratings.map((rating) => ({
        source: rating.Source,
        value: percentileConvertor(rating.Value),
      }));
      const avg = averageRatingCalculator(percentileRatings);
      return {
        ...movie,
        title: match.Title.split(':')[1],
        plot: match.Plot,
        director: match.Director,
        ratings: percentileRatings,
        ratingAverage: avg,
        poster: match.Poster,
      };
    }
    return movie;
  });
};

/**
 * Function that takes in the response from fetching the movies and maps to an array the only pertinent data
 * @param results The results array from the fetch movies call response
 * @returns {*}
 */
export const simplifyResults = (results) =>
  results.map((movie) => {
    return {
      episode_id: String(movie.episode_id),
      title: movie.title,
      release_date: movie.release_date,
      release_year: new Date(movie.release_date).getFullYear(),
    };
  });

const byFieldResolver = {
  year: 'release_year',
  episode: 'episode_id',
  rating: 'ratingAverage',
};
export const sortFunc = (movies, sortBy) => {
  const parts = sortBy.split('-');
  const byField = byFieldResolver[parts[0]];
  if (parts[1] === 'asc') {
    return movies.sort((a, b) => a[byField] - b[byField]);
  } else {
    return movies.sort((a, b) => b[byField] - a[byField]);
  }
};

export const filterFunc = (filterBy) => {
  const localStorageMovies = localStorage.getItem('storedMovies')
    ? JSON.parse(localStorage.getItem('storedMovies'))
    : [];
  return filterBy
    ? localStorageMovies.filter((movie) =>
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
export const debounce = (func, timeout) => {
  let timer;
  const debouncedFunction = function (...args) {
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

export const percentileConvertor = (rating) => {
  if (rating.includes('%')) {
    return parseFloat(rating);
  } else {
    const [score, outOf] = rating.split('/');
    return Math.round((parseFloat(score) / parseFloat(outOf)) * 100);
  }
};

export const averageRatingCalculator = (ratings) => {
  const total = ratings.reduce((acc, curr) => acc + curr.value, 0);
  const ratingPercentile = Math.round(total / ratings.length);
  return (ratingPercentile / 100) * 10;
};

export const moviesEnrichFunction = (movies, detailsPerMovie) => {
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

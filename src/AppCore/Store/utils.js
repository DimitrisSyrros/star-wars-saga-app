/**
 * Function that takes in the response from fetching the movies and maps to an array the only pertinent data
 * @param results The results array from the fetch movies call response
 * @returns {*}
 */
export const simplifyResults = (results) =>
  results.map((movie) => {
    return {
      episode_id: movie.episode_id,
      title: movie.title,
      release_year: new Date(movie.release_date).getFullYear(),
    };
  });

const byFieldResolver = {
  year: 'release_year',
  episode: 'episode_id',
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

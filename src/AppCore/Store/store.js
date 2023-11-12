import React, { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import apiService from '../Api/movieApi';

export const StoreContext = createContext(null);

export const simplifyResults = (results) =>
  results.map((movie) => {
    return {
      episode_id: movie.episode_id,
      title: movie.title,
      release_year: new Date(movie.release_date).getFullYear(),
    };
  });
export const StoreProvider = ({ children }) => {
  const localStorageMovies = localStorage.getItem('storedMovies')
    ? JSON.parse(localStorage.getItem('storedMovies'))
    : null;

  const [movies, setMovies] = useState(localStorageMovies);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(!localStorageMovies);

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
          setErrorMessage(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, []);

  const store = {
    movies,
    setMovies,
    errorMessage,
    setErrorMessage,
    loading,
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

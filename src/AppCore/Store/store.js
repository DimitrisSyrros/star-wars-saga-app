import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import apiService from '../Api/movieApi';
import { filterFunc, simplifyResults, sortFunc } from './utils';

export const StoreContext = createContext(null);

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
  }, [localStorageMovies]);

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

  const store = {
    movies,
    setMovies,
    errorMessage,
    setErrorMessage,
    loading,
    handleSort,
    filterMovies,
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

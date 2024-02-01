import {
  MovieSortFilterContainer,
  MovieFilterInput,
  ClearFilterButton,
} from './movieSortFilterBar_style';
import MovieSorter from '../MovieSorter/movieSorter';
import { useContext, useState } from 'react';
import { StoreContext, StoreType } from '../../AppCore/Store/store';
import { useNavigate } from 'react-router-dom';

/**
 * Component that renders search input for filtering and a sort by select
 * @returns {JSX.Element}
 * @constructor
 */
const MovieSortFilterBar = () => {
  const [inputValue, setInputValue] = useState('');
  const { debouncedFilterMovies, loading } = useContext(
    StoreContext
  ) as StoreType;

  /**
   * Calls the debounced filtering mechanism as well as updates the component's state
   * @param value the current event's target value
   */
  const handleInputValue = (value: string) => {
    debouncedFilterMovies(value);
    setInputValue(value);
  };

  /**
   * Calls the debounced filtering mechanism with empty string
   * to clear the filtering on the MovieList component and updates the component state accordingly
   */
  const clearInputValue = () => {
    debouncedFilterMovies('');
    setInputValue('');
  };

  const navigate = useNavigate();

  return (
    <MovieSortFilterContainer>
      <MovieSorter disabled={loading} />
      <MovieFilterInput
        id="movie-filter"
        type="text"
        placeholder="Filter by movie name..."
        autoComplete="off"
        value={inputValue}
        disabled={loading}
        onChange={(e) => handleInputValue(e.target.value)}
        onFocus={() => navigate('/')}
      />
      <ClearFilterButton onClick={clearInputValue}>CLEAR</ClearFilterButton>
    </MovieSortFilterContainer>
  );
};

export default MovieSortFilterBar;

import {
  MovieSortFilterContainer,
  MovieFilterInput,
  ClearFilterButton,
} from './movieSortFilterBar_style';
import MovieSorter from '../MovieSorter/movieSorter';
import { useContext, useState } from 'react';
import { StoreContext } from '../../AppCore/Store/store';
import { useNavigate } from 'react-router-dom';

const MovieSortFilterBar = () => {
  const [inputValue, setInputValue] = useState('');
  const { debouncedFilterMovies, loading } = useContext(StoreContext);

  const handleInputValue = (value) => {
    debouncedFilterMovies(value);
    setInputValue(value);
  };

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

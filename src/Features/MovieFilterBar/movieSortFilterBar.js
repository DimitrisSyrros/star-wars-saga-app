import {
  MovieSortFilterContainer,
  MovieFilterInput,
} from './movieSortFilterBar_style';
import MovieSorter from './movieSorter';
import { useContext } from 'react';
import { StoreContext } from '../../AppCore/Store/store';

const MovieSortFilterBar = () => {
  const { debouncedFilterMovies, loading } = useContext(StoreContext);
  return (
    <MovieSortFilterContainer>
      <MovieSorter disabled={loading} />
      <MovieFilterInput
        id="movie-filter"
        type="text"
        placeholder="Filter by movie name..."
        autoComplete="off"
        disabled={loading}
        onChange={(e) => debouncedFilterMovies(e.target.value)}
      />
    </MovieSortFilterContainer>
  );
};

export default MovieSortFilterBar;

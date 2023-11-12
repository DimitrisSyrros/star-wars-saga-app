import {
  MovieSortFilterContainer,
  MovieFilterInput,
} from './movieSortFilterBar_style';
import MovieSorter from './movieSorter';
import { useCallback, useContext } from 'react';
import { debounce } from '../../AppCore/Store/utils';
import { StoreContext } from '../../AppCore/Store/store';

const MovieSortFilterBar = () => {
  const { filterMovies, loading } = useContext(StoreContext);
  const optimizeDebounce = useCallback(
    (value) => debounce(filterMovies(value), 500),
    [filterMovies]
  );
  return (
    <MovieSortFilterContainer>
      <MovieSorter disabled={loading} />
      <MovieFilterInput
        id="movie-filter"
        type="text"
        placeholder="Filter by movie name..."
        autoComplete="off"
        disabled={loading}
        onChange={(e) => optimizeDebounce(e.target.value)}
      />
    </MovieSortFilterContainer>
  );
};

export default MovieSortFilterBar;

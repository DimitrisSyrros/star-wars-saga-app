import {
  MovieSortFilterContainer,
  MovieFilterInput,
} from './movieSortFilterBar_style';
import MovieSorter from './movieSorter';

const MovieSortFilterBar = () => {
  return (
    <MovieSortFilterContainer>
      <MovieSorter />
      <MovieFilterInput
        id="movie-filter"
        type="text"
        placeholder="Filter by movie name..."
        autoComplete="off"
        onChange={(e) => console.log(e.target.value)}
      />
    </MovieSortFilterContainer>
  );
};

export default MovieSortFilterBar;

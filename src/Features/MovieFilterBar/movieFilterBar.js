import { MovieFilterContainer, MovieFilterInput } from './movieFilterBar_style';

const MovieFilterBar = () => {
  return (
    <MovieFilterContainer>
      <MovieFilterInput
        id="movie-filter"
        type="text"
        placeholder="Filter by movie name..."
        autoComplete="off"
        onChange={(e) => console.log(e)}
      />
    </MovieFilterContainer>
  );
};

export default MovieFilterBar;

import React, { useContext } from 'react';
import {
  Row,
  SkeletonRow,
  ListContainer,
  MovieTitle,
  MovieEpisode,
  MovieReleaseDate,
  SkeletonMovieEpisode,
  SkeletonMovieTitle,
  SkeletonMovieYear,
} from './movieList_style';
import { ContentSection } from '../../AppCore/app_style';
import { StoreContext } from '../../AppCore/Store/store';
import PropTypes from 'prop-types';

const MovieList = ({ onMovieSelect }) => {
  const { movies, loading } = useContext(StoreContext);
  return (
    <ContentSection>
      <ListContainer>
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <SkeletonRow key={index}>
              <SkeletonMovieEpisode />
              <SkeletonMovieTitle />
              <SkeletonMovieYear />
            </SkeletonRow>
          ))
        ) : (
          <React.Fragment>
            {movies
              ? movies.map((movie) => (
                  <Row
                    key={movie.episode_id}
                    role="button"
                    onClick={() => onMovieSelect(movie.episode_id)}
                  >
                    <MovieEpisode>EPISODE {movie.episode_id}</MovieEpisode>
                    <MovieTitle>{movie.title}</MovieTitle>
                    <MovieReleaseDate>{movie.release_date}</MovieReleaseDate>
                  </Row>
                ))
              : null}
          </React.Fragment>
        )}
      </ListContainer>
    </ContentSection>
  );
};

MovieList.propTypes = {
  onMovieSelect: PropTypes.func,
};

export default MovieList;

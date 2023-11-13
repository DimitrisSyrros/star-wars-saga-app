import React, { useContext } from 'react';
import { ContentSection } from '../../AppCore/app_style';
import { useParams } from 'react-router-dom';
import { StoreContext } from '../../AppCore/Store/store';
import {
  MovieDetailsContainer,
  MovieDetailsPlot,
  MovieDetailsDirector,
  MovieDetailsInfo,
  MovieDetailsTitle,
} from './movieDetails_style';
import MoviePoster from './moviePoster';

const MovieDetails = () => {
  const { movieSelector } = useContext(StoreContext);
  const { episodeId } = useParams();
  const selectedMovie = movieSelector(episodeId);
  return (
    <React.Fragment>
      {selectedMovie ? (
        <ContentSection>
          <MovieDetailsContainer>
            <MovieDetailsTitle>{selectedMovie.title}</MovieDetailsTitle>
            <MovieDetailsInfo>
              <MoviePoster
                src={selectedMovie.poster}
                alt={`${selectedMovie.title} movie poster`}
                width="200px"
                height="300px"
              />
              <MovieDetailsPlot>{selectedMovie.plot}</MovieDetailsPlot>
            </MovieDetailsInfo>
            <MovieDetailsDirector>{`Director: ${selectedMovie.director}`}</MovieDetailsDirector>
          </MovieDetailsContainer>
        </ContentSection>
      ) : null}
    </React.Fragment>
  );
};

export default MovieDetails;

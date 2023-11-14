import React, { useContext } from 'react';
import { ContentSection } from '../../AppCore/app_style';
import { Link, useParams } from 'react-router-dom';
import { StoreContext } from '../../AppCore/Store/store';
import {
  MovieDetailsContainer,
  MovieDetailsPlot,
  MovieDetailsDirector,
  MovieDetailsInfo,
  MovieDetailsTitle,
  MovieDetailsAvgRatingSection,
  OtherRatingsSection,
  OtherRating,
} from './movieDetails_style';
import MoviePoster from './moviePoster';
import StarRating from '../StarRating/starRating';
import MovieNotFound from './movieNotFound';
import { BASE_PATH } from '../../AppCore/AppContent/common/constants';
import PropTypes from 'prop-types';

const AVERAGE_RATING = 'Average rating: ';

const MovieDetails = ({ isMobile }) => {
  const { movieSelector, detailsLoading } = useContext(StoreContext);
  const { episodeId } = useParams();
  const selectedMovie = movieSelector(episodeId);
  return (
    <React.Fragment>
      {selectedMovie ? (
        <ContentSection>
          {isMobile ? <Link to={BASE_PATH}>Go back to MovieList </Link> : null}
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
            <MovieDetailsAvgRatingSection>
              <span>{AVERAGE_RATING}</span>
              {!detailsLoading ? (
                <StarRating
                  keyPrefix={`Details_${selectedMovie.episode_id}_${selectedMovie.title}`}
                  starCount={selectedMovie.ratingAverage}
                />
              ) : null}
            </MovieDetailsAvgRatingSection>
            <OtherRatingsSection>
              {selectedMovie.ratings
                ? selectedMovie.ratings.map((rating) => (
                    <OtherRating
                      key={`${rating.source}_${rating.value}`}
                    >{`${rating.source}: ${rating.value}%`}</OtherRating>
                  ))
                : null}
            </OtherRatingsSection>
          </MovieDetailsContainer>
        </ContentSection>
      ) : (
        <MovieNotFound />
      )}
    </React.Fragment>
  );
};

MovieDetails.propTypes = {
  isMobile: PropTypes.bool,
};
export default MovieDetails;

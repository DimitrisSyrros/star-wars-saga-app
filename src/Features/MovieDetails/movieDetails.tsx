import React, { useContext } from 'react';
import { ContentSection } from '../../AppCore/app_style';
import { Link, useParams } from 'react-router-dom';
import { StoreContext, StoreType } from '../../AppCore/Store/store';
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
import MoviePoster from '../MoviePoster/moviePoster';
import StarRating from '../StarRating/starRating';
import MovieNotFound from '../MovieNotFound/movieNotFound';
import { BASE_PATH } from '../../AppCore/AppContent/common/constants';
import { PercentileRatingsType } from '../../AppCore/genericTypes';

const AVERAGE_RATING = 'Average rating: ';

type MovieDetailsProps = {
  isMobile: boolean;
};

/**
 * The movie details component renders all the details of a movie
 * If the view is on mobile then renders a Link to movieList
 * While movie details are being fetched detailsLoading is true
 * and a skeleton of the ui is rendered instead of the actual data
 * In case the selected movie is not found then the MovieNotFound
 * component is rendered instead of the details
 * @param isMobile  {Boolean} defines whether the view is a mobile view or a desktop view
 * @returns {Element}
 * @constructor
 */
const MovieDetails = ({ isMobile }: MovieDetailsProps): React.JSX.Element => {
  const { movieSelector, detailsLoading } = useContext(
    StoreContext
  ) as StoreType;
  const { episodeId = '' } = useParams();
  const selectedMovie = movieSelector(episodeId);
  const movieDetailsFetched =
    localStorage.getItem('movieDetailsFetched') === 'true';
  return (
    <React.Fragment>
      {selectedMovie ? (
        <ContentSection>
          {isMobile ? <Link to={BASE_PATH}>Go back to MovieList </Link> : null}
          {movieDetailsFetched ? (
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
                  ? selectedMovie.ratings.map(
                      (rating: PercentileRatingsType) => (
                        <OtherRating
                          key={`${rating.source}_${rating.value}`}
                        >{`${rating.source}: ${rating.value}%`}</OtherRating>
                      )
                    )
                  : null}
              </OtherRatingsSection>
            </MovieDetailsContainer>
          ) : null}
        </ContentSection>
      ) : (
        <MovieNotFound />
      )}
    </React.Fragment>
  );
};
export default MovieDetails;

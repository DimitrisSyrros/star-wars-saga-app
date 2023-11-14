import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MovieList from '../../Features/MovieList/movieList';
import MovieDetails from '../../Features/MovieDetails/movieDetails';
import { ContentLayout } from '../app_style';
import { useWindowSize } from './common/utils';
import MovieSortFilterBar from '../../Features/MovieFilterBar/movieSortFilterBar';
import { BASE_PATH, MOVIE_PATH } from './common/constants';
import SelectMovieView from '../../Features/SelectMovieView/selectMovieView';
import ErrorModal from '../../Features/ErrorModal/errorModal';

/**
 * Main component that renders the application views depending on window size
 * Desktop view shows the movie list alongside the movieDetails component
 * Mobile view utilizes the react-router-dom library to display the movie list or the details of a specific movie
 * depending on the url
 * @returns {Element}
 * @constructor
 */
const AppContent = () => {
  const size = useWindowSize();
  const isMobile = size < 768;
  const navigate = useNavigate();

  /**
   * This hook clears the cached data every 6 hours
   */
  useEffect(() => {
    const clearCache = () => {
      localStorage.clear();
    };
    const lastFetchedTime = localStorage.getItem('lastFetchedTime');

    if (lastFetchedTime) {
      const now = new Date();
      const lastFetchedDate = new Date(parseInt(lastFetchedTime));
      // const sixHoursInMilliseconds = 6 * 60 * 60 * 1000;
      const tenMinutesInMilliseconds = 10 * 60 * 1000;
      if (now - lastFetchedDate > tenMinutesInMilliseconds) {
        clearCache();
      }
    }
  }, []);

  /**
   * This function utilizing the episode id of a selected movie navigates to the movie's path
   * @param episodeId {String} identifier of the movie
   */
  const handleMovieSelect = (episodeId) => {
    navigate(`/movie/${episodeId}`);
  };

  return (
    <React.Fragment>
      {!isMobile || window.location.pathname === BASE_PATH ? (
        <MovieSortFilterBar />
      ) : null}
      <ContentLayout>
        {!isMobile ? <MovieList onMovieSelect={handleMovieSelect} /> : null}
        <Routes>
          {isMobile ? (
            <Route
              path={BASE_PATH}
              element={<MovieList onMovieSelect={handleMovieSelect} />}
            />
          ) : null}
          <Route path={BASE_PATH} element={<SelectMovieView />} />
          <Route
            path={MOVIE_PATH}
            element={<MovieDetails isMobile={isMobile} />}
          />
        </Routes>
      </ContentLayout>
      <ErrorModal />
    </React.Fragment>
  );
};

export default AppContent;

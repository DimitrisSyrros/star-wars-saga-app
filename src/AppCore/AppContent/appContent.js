import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MovieList from '../../Features/MovieList/movieList';
import MovieDetails from '../../Features/MovieDetails/movieDetails';
import { ContentLayout, ContentSection } from '../app_style';
import { useWindowSize } from './common/utils';
import MovieSortFilterBar from '../../Features/MovieFilterBar/movieSortFilterBar';
import { BASE_PATH, MOVIE_PATH } from './common/constants';

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

  const handleMovieSelect = (id) => {
    navigate(`/movie/${id}`);
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
          <Route
            path={BASE_PATH}
            element={<ContentSection>Select a Movie</ContentSection>}
          />
          <Route path={MOVIE_PATH} element={<MovieDetails />} />
        </Routes>
      </ContentLayout>
    </React.Fragment>
  );
};

export default AppContent;

import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MovieList from '../../Features/MovieList/movieList';
import MovieDetails from '../../Features/MovieDetails/movieDetails';
import { ContentLayout, ContentSection } from '../app_style';
import { useWindowSize } from './common/utils';

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
    <ContentLayout>
      {!isMobile ? <MovieList onMovieSelect={handleMovieSelect} /> : null}
      <Routes>
        {isMobile ? (
          <Route
            path="/"
            element={<MovieList onMovieSelect={handleMovieSelect} />}
          />
        ) : null}
        <Route
          path="/"
          element={<ContentSection>Select a Movie</ContentSection>}
        />
        <Route path="movie/:id" element={<MovieDetails />} />
      </Routes>
    </ContentLayout>
  );
};

export default AppContent;

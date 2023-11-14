import { ContentSection } from '../../AppCore/app_style';
import React from 'react';
import {
  MovieSelectContainer,
  MovieSelectTitle,
} from './selectMovieView_style';

/**
 * Simple view, renders an informative message for the user
 * @returns {React.JSX.Element}
 * @constructor
 */
const SelectMovieView = () => (
  <ContentSection>
    <MovieSelectContainer>
      <MovieSelectTitle>Select A Movie</MovieSelectTitle>
      <p>
        Select a movie from the movie list on your left to see more movie
        details!
      </p>
    </MovieSelectContainer>
  </ContentSection>
);

export default SelectMovieView;

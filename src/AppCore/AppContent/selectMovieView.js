import { ContentSection } from '../app_style';
import React from 'react';
import {
  MovieSelectContainer,
  MovieSelectTitle,
} from './selectMovieView_style';

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

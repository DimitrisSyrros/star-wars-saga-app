import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelectMovieView from './SelectMovieView';

describe('SelectMovieView', () => {
  it('renders the title and informative message', () => {
    render(<SelectMovieView />);

    expect(screen.getByText('Select A Movie')).toBeInTheDocument();

    expect(
      screen.getByText(
        'Select a movie from the movie list on your left to see more movie details!'
      )
    ).toBeInTheDocument();
  });
});

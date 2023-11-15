import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieNotFound from './MovieNotFound';
import { BrowserRouter } from 'react-router-dom';

describe('MovieNotFound', () => {
  it('renders the not found message and the link to MovieList', () => {
    render(
      <BrowserRouter>
        <MovieNotFound />
      </BrowserRouter>
    );

    expect(
      screen.getByText('These are not the details you are searching for!')
    ).toBeInTheDocument();
    expect(screen.getByText('MovieList')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });
});

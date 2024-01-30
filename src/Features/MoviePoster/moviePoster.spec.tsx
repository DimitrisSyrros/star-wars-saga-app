import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MoviePoster from './moviePoster';

describe('MoviePoster', () => {
  it('renders the movie poster with the correct attributes', () => {
    const testProps = {
      src: 'test-src.jpg',
      alt: 'Test Alt',
      width: '200px',
      height: '300px',
    };

    render(<MoviePoster {...testProps} />);

    const image = screen.getByRole('img', { name: testProps.alt });
    expect(image).toHaveAttribute('src', testProps.src);
    expect(image).toHaveAttribute('alt', testProps.alt);
    expect(image).toHaveAttribute('loading', 'lazy');
  });
});

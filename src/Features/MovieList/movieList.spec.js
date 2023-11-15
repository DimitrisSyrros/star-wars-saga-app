import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieList from './MovieList';
import { StoreContext } from '../../AppCore/Store/store';

describe('MovieList', () => {
  it('renders skeletons when loading', () => {
    const contextValue = {
      movies: [],
      loading: true,
      detailsLoading: false,
    };

    render(
      <StoreContext.Provider value={contextValue}>
        <MovieList onMovieSelect={jest.fn()} />
      </StoreContext.Provider>
    );

    const skeletons = screen.getAllByText('', { selector: 'div' });
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders movie rows when not loading', () => {
    const contextValue = {
      movies: [
        {
          episode_id: 'IV',
          title: 'A New Hope',
          ratingAverage: 4.5,
          release_date: '1977-05-25',
        },
      ],
      loading: false,
      detailsLoading: false,
    };

    render(
      <StoreContext.Provider value={contextValue}>
        <MovieList onMovieSelect={jest.fn()} />
      </StoreContext.Provider>
    );

    expect(screen.getByText('EPISODE IV')).toBeInTheDocument();
    expect(screen.getByText('A New Hope')).toBeInTheDocument();
    expect(screen.getByText('1977-05-25')).toBeInTheDocument();
  });
});

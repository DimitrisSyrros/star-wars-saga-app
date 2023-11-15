import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieSortFilterBar from './MovieSortFilterBar';
import { StoreContext } from '../../AppCore/Store/store';
import { BrowserRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('MovieSortFilterBar', () => {
  it('updates input value on change', () => {
    const debouncedFilterMovies = jest.fn();
    render(
      <StoreContext.Provider value={{ debouncedFilterMovies, loading: false }}>
        <BrowserRouter>
          <MovieSortFilterBar />
        </BrowserRouter>
      </StoreContext.Provider>
    );

    const input = screen.getByPlaceholderText('Filter by movie name...');
    fireEvent.change(input, { target: { value: 'Star Wars' } });

    expect(input.value).toBe('Star Wars');
    expect(debouncedFilterMovies).toHaveBeenCalledWith('Star Wars');
  });

  it('clears input value when clear button is clicked', () => {
    const debouncedFilterMovies = jest.fn();
    render(
      <StoreContext.Provider value={{ debouncedFilterMovies, loading: false }}>
        <BrowserRouter>
          <MovieSortFilterBar />
        </BrowserRouter>
      </StoreContext.Provider>
    );

    const input = screen.getByPlaceholderText('Filter by movie name...');
    const clearButton = screen.getByText('CLEAR');

    fireEvent.change(input, { target: { value: 'Star Wars' } });
    fireEvent.click(clearButton);

    expect(input.value).toBe('');
    expect(debouncedFilterMovies).toHaveBeenCalledWith('');
  });

  it('disables input and sorter when loading', () => {
    render(
      <StoreContext.Provider
        value={{ debouncedFilterMovies: jest.fn(), loading: true }}
      >
        <BrowserRouter>
          <MovieSortFilterBar />
        </BrowserRouter>
      </StoreContext.Provider>
    );

    const input = screen.getByPlaceholderText('Filter by movie name...');
    const sorter = screen.getByRole('combobox');

    expect(input).toBeDisabled();
    expect(sorter).toBeDisabled();
  });
});

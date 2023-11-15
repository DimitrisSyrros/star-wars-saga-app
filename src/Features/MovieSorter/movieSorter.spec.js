import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieSorter from './MovieSorter';
import { StoreContext } from '../../AppCore/Store/store';

describe('MovieSorter', () => {
  it('calls handleSort when an option is selected', () => {
    const handleSortMock = jest.fn();
    render(
      <StoreContext.Provider value={{ handleSort: handleSortMock }}>
        <MovieSorter disabled={false} />
      </StoreContext.Provider>
    );

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'year-asc' },
    });

    expect(handleSortMock).toHaveBeenCalledWith('year-asc');
  });

  it('is disabled when the disabled prop is true', () => {
    render(
      <StoreContext.Provider value={{ handleSort: jest.fn() }}>
        <MovieSorter disabled={true} />
      </StoreContext.Provider>
    );

    expect(screen.getByRole('combobox')).toBeDisabled();
  });
});

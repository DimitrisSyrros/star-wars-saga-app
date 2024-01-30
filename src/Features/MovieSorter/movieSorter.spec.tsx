export {};
// import React, { Dispatch } from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import MovieSorter from './movieSorter';
// import {
//   DebounceFilterMoviesProps,
//   StoreContext,
//   StoreType,
// } from '../../AppCore/Store/store';
// import { SimpleMovieType } from '../../AppCore/genericTypes';
//
// const mockStore: StoreType = {
//   movies: [],
//   setMovies: jest.fn(),
//   errorMessage: '',
//   setErrorMessage: jest.fn(),
//   loading: false,
//   detailsLoading: false,
//   handleSort: jest.fn(),
//   debouncedFilterMovies: jest.fn(),
//   movieSelector: jest.fn(),
// };
// describe('MovieSorter', () => {
//   it('calls handleSort when an option is selected', () => {
//     render(
//       <StoreContext.Provider value={mockStore}>
//         <MovieSorter disabled={false} />
//       </StoreContext.Provider>
//     );
//
//     fireEvent.change(screen.getByRole('combobox'), {
//       target: { value: 'year-asc' },
//     });
//
//     expect(mockStore.handleSort).toHaveBeenCalledWith('year-asc');
//   });
//
//   it('is disabled when the disabled prop is true', () => {
//     render(
//       <StoreContext.Provider value={{ handleSort: jest.fn() }}>
//         <MovieSorter disabled={true} />
//       </StoreContext.Provider>
//     );
//
//     expect(screen.getByRole('combobox')).toBeDisabled();
//   });
// });

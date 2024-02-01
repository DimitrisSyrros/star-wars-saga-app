export {};
// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import MovieDetails from './movieDetails';
// import { StoreContext } from '../../AppCore/Store/store';
// import { MemoryRouter, Route, Routes } from 'react-router-dom';
//
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useParams: () => ({
//     episodeId: '1',
//   }),
// }));
//
// describe('MovieDetails', () => {
//   const localStorageMock = (function () {
//     let store = {};
//     return {
//       getItem: function (key) {
//         return store[key];
//       },
//       setItem: function (key, value) {
//         store[key] = value.toString();
//       },
//       clear: function () {
//         store = {};
//       },
//     };
//   })();
//   Object.defineProperty(window, 'localStorage', {
//     value: localStorageMock,
//   });
//
//   beforeEach(() => {
//     window.localStorage.setItem('movieDetailsFetched', 'true');
//   });
//
//   afterEach(() => {
//     window.localStorage.clear();
//   });
//
//   it('renders movie details when a movie is selected', () => {
//     const movieSelectorMock = jest.fn().mockReturnValue({
//       title: 'A New Hope',
//       poster: 'poster_url',
//       plot: 'Movie Plot',
//       director: 'George Lucas',
//       ratingAverage: 8.7,
//       ratings: [{ source: 'IMDb', value: '87' }],
//       episode_id: '1',
//     });
//
//     render(
//       <StoreContext.Provider
//         value={{ movieSelector: movieSelectorMock, detailsLoading: false }}
//       >
//         <MemoryRouter initialEntries={['/movies/1']}>
//           <Routes>
//             <Route
//               path="/movies/:episodeId"
//               element={<MovieDetails isMobile={false} />}
//             />
//           </Routes>
//         </MemoryRouter>
//       </StoreContext.Provider>
//     );
//
//     expect(screen.getByText('A New Hope')).toBeInTheDocument();
//     expect(screen.getByText('Movie Plot')).toBeInTheDocument();
//     expect(screen.getByText('Director: George Lucas')).toBeInTheDocument();
//     expect(screen.getByText('Average rating:')).toBeInTheDocument();
//     expect(screen.getByText('IMDb: 87%')).toBeInTheDocument();
//   });
//
//   it('renders MovieNotFound when no movie is selected', () => {
//     const movieSelectorMock = jest.fn().mockReturnValue(null);
//
//     render(
//       <StoreContext.Provider
//         value={{ movieSelector: movieSelectorMock, detailsLoading: false }}
//       >
//         <MemoryRouter initialEntries={['/movies/16']}>
//           <Routes>
//             <Route
//               path="/movies/:episodeId"
//               element={<MovieDetails isMobile={false} />}
//             />
//           </Routes>
//         </MemoryRouter>
//       </StoreContext.Provider>
//     );
//
//     expect(
//       screen.getByText('These are not the details you are searching for!')
//     ).toBeInTheDocument();
//   });
// });

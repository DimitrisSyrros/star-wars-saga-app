import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StoreContext } from '../../AppCore/Store/store';
import ErrorModal from './ErrorModal';

const mockSetErrorMessage = jest.fn();
const mockErrorMessage = 'Test Error Message';

const wrapper = ({ children }) => (
  <StoreContext.Provider
    value={{
      errorMessage: mockErrorMessage,
      setErrorMessage: mockSetErrorMessage,
    }}
  >
    {children}
  </StoreContext.Provider>
);

describe('ErrorModal Component', () => {
  it('should display the error message when errorMessage is not empty', () => {
    render(<ErrorModal />, { wrapper });

    expect(screen.getByText(mockErrorMessage)).toBeInTheDocument();
  });

  it('should not display the modal when errorMessage is empty', () => {
    render(
      <StoreContext.Provider
        value={{ errorMessage: '', setErrorMessage: mockSetErrorMessage }}
      >
        <ErrorModal />
      </StoreContext.Provider>
    );

    expect(screen.queryByText(mockErrorMessage)).not.toBeInTheDocument();
  });

  it('should call setErrorMessage with an empty string when close button is clicked', () => {
    render(<ErrorModal />, { wrapper });

    fireEvent.click(screen.getByText('×'));
    expect(mockSetErrorMessage).toHaveBeenCalledWith('');
  });
});

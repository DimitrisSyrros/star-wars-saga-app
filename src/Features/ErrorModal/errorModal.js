import React, { useContext } from 'react';
import { StoreContext } from '../../AppCore/Store/store';
import { CloseButton, ModalContent, StyledModal } from './errorModal_style';

/**
 * Basic error modal component renders an error message provided by the StoreContext
 * @returns {Element}
 * @constructor
 */
const ErrorModal = () => {
  const { errorMessage, setErrorMessage } = useContext(StoreContext);
  const showModal = errorMessage !== '';

  return (
    <StyledModal show={showModal}>
      <ModalContent>
        <CloseButton onClick={() => setErrorMessage('')}>&times;</CloseButton>
        <p>{errorMessage}</p>
      </ModalContent>
    </StyledModal>
  );
};

export default ErrorModal;

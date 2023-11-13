import styled from 'styled-components';

export const MovieSortFilterContainer = styled.div`
  display: flex;
  justify-content: flex-start; /* Align children to the left */
  align-items: center; /* Center children vertically */
  width: 100%;
  height: 50px;
  background: #dedbdb;
  color: white;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;
`;

export const MovieFilterInput = styled.input`
  width: 50%;
  padding: 5px;
  margin-left: 5%; /* If you want some spacing from the left edge */
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
`;

import styled from 'styled-components';

export const MovieSortFilterContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
  margin-left: 5%;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
`;

export const ClearFilterButton = styled.button`
  background-color: #f2f2f2;
  color: #333;
  padding: 0.5em 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e6e6e6;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #007bff;
  }

  &:active {
    background-color: #d4d4d4;
  }
`;

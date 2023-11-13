import styled from 'styled-components';

export const MovieDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  margin: 20px;
`;

export const MovieDetailsTitle = styled.h1`
  font-size: 1.5rem;
`;

export const MovieDetailsInfo = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap; // Allows items to wrap on smaller screens
  align-items: center; // Vertically aligns children in the middle
  justify-content: flex-start; // Aligns children at the start of the container
  gap: 1rem; // Adds space between the poster and the plot
`;

export const MovieDetailsPlot = styled.p`
  font-size: 1rem;
  flex: 1; // Takes up the remaining space after the image
  min-width: 0; // Fixes flexbox overflow issue
`;

export const MovieDetailsDirector = styled.p`
  font-size: 1rem;
  margin: 0;
`;

export const MovieDetailsAvgRatingSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const OtherRatingsSection = styled.div`
  display: flex;
  flex-direction: row;
`;

export const OtherRating = styled.span`
  color: #0077d9ff;
  margin-right: 1.1rem;
  border-radius: 20px;
  border: 1px #0077d9ff solid;
  padding: 0.3rem;
`;

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
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;

  @media (max-width: 1440px) {
    flex-direction: column;
  }
`;

export const MovieDetailsPlot = styled.p`
  font-size: 1rem;
  flex: 1;
  min-width: 0;
  text-align: justify;
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

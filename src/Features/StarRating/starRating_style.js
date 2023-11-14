import styled from 'styled-components';

export const StarFull = styled.span`
  color: gold;
`;

export const StarEmpty = styled.span`
  color: grey;
`;

export const StarRatingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 0.5rem;
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

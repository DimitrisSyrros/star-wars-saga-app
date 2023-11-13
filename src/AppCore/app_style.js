import styled, { keyframes } from 'styled-components';

export const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContentLayout = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ContentSection = styled.div`
  flex: 1;
`;

export const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

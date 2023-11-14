import styled, { createGlobalStyle, keyframes } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Kanit', sans-serif;
    margin: 0;
    padding: 0;
    font-weight: 200;
    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  }
`;
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
  @media (max-width: 768px) {
    width: 100vw;
  }
`;

export const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

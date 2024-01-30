import styled from 'styled-components';

type ImgContainerProps = {
  width: string;
  height: string;
};
export const ImgContainer = styled.div<ImgContainerProps>`
  width: ${(props) => props.width || '200px'};
  height: ${(props) => props.height || '300px'};
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

type StyledImageProps = {
  src?: string;
  alt: string;
  loading: string;
};

export const StyledImage = styled.img<StyledImageProps>`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

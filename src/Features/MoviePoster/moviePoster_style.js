import styled from 'styled-components';

export const ImgContainer = styled.div`
  width: ${(props) => props.width || '200px'};
  height: ${(props) => props.height || '300px'};
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

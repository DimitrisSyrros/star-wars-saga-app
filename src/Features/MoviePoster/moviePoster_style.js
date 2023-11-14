import { shimmer } from '../../AppCore/app_style';
import styled from 'styled-components';

export const SkeletonPoster = styled.div`
  width: 100%;
  height: 100%;
  background-color: #eee;
  animation: ${shimmer} 1.5s infinite ease-in-out;
`;

export const ImgContainer = styled.div`
  width: ${(props) => props.width || '200px'}; // Fixed width for all images
  height: ${(props) => props.height || '300px'}; // Fixed height for all images
  flex-shrink: 0; // Prevents the container from shrinking
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; // Ensures the image doesn't overflow the container
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain; // Keeps the aspect ratio of the image
`;

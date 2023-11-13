import styled from 'styled-components';
import { shimmer } from '../../AppCore/app_style';

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 20px;
  box-sizing: border-box;
`;

export const MovieEpisode = styled.div`
  flex: 1;
  padding-right: 10px;
`;

export const MovieTitle = styled.div`
  flex: 1;
`;

export const MovieReleaseDate = styled.div`
  width: fit-content;
  text-align: right;
`;

export const SkeletonRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  animation: ${shimmer} 1.2s linear infinite;
  background: #f6f7f8;
  background-image: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  background-repeat: no-repeat;
  background-size: 100% 100%;
`;

export const SkeletonMovieEpisode = styled.div`
  flex: 1;
  padding-right: 10px;
  background: #f6f7f8;
  height: 20px;
`;

export const SkeletonMovieTitle = styled.div`
  flex: 1;
  background: #f6f7f8;
  height: 20px;
`;

export const SkeletonMovieYear = styled.div`
  width: 60px;
  background: #f6f7f8;
  height: 20px;
`;

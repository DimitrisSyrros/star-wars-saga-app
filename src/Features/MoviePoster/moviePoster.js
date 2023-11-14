import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ImgContainer, SkeletonPoster, StyledImage } from './moviePoster_style';

/**
 * Renders the movie poster
 * @param src The url source
 * @param alt An alternative text
 * @param width The movie poster's desired width
 * @param height  The movie poster's desired height
 * @returns {Element}
 * @constructor
 */
const MoviePoster = ({ src, alt, width, height }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ImgContainer width={width} height={height}>
      {isLoading && <SkeletonPoster />}
      <StyledImage
        src={src}
        alt={alt}
        isLoading={isLoading}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
        loading="lazy"
      />
    </ImgContainer>
  );
};

MoviePoster.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default MoviePoster;

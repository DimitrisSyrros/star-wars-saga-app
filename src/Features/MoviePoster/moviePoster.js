import React from 'react';
import PropTypes from 'prop-types';
import { ImgContainer, StyledImage } from './moviePoster_style';

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
  return (
    <ImgContainer width={width} height={height}>
      <StyledImage src={src} alt={alt} loading="lazy" />
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

import React from 'react';
import PropTypes from 'prop-types';
import { StarEmpty, StarFull, StarRatingContainer } from './starRating_style';

const convertToStarCounts = (starCount) => {
  const fullStars = Math.round(starCount); // Round to the nearest whole number
  const emptyStars = 10 - fullStars;
  return { fullStars, emptyStars };
};

const StarRating = ({ starCount, keyPrefix }) => {
  const { fullStars, emptyStars } = convertToStarCounts(starCount);
  const fullStarElements = Array.from({ length: fullStars }, (_, index) => (
    <StarFull key={`${keyPrefix}_full_${index}`}>★</StarFull>
  ));
  const emptyStarElements = Array.from({ length: emptyStars }, (_, index) => (
    <StarEmpty key={`${keyPrefix}_empty_${index}`}>☆</StarEmpty>
  ));
  const starElements = fullStarElements.concat(emptyStarElements);

  return <StarRatingContainer>{starElements}</StarRatingContainer>;
};

StarRating.propTypes = {
  starCount: PropTypes.number.isRequired,
  keyPrefix: PropTypes.string,
};

export default StarRating;

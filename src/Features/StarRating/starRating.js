import React from 'react';
import PropTypes from 'prop-types';
import { StarEmpty, StarFull, StarRatingContainer } from './starRating_style';

/**
 * Calculates how many of the 10 to be rendered
 * stars will be filled and how many will be empty
 * @param starCount The rating based star count
 */
const convertToStarCounts = (starCount) => {
  const fullStars = Math.round(starCount);
  const emptyStars = 10 - fullStars;
  return { fullStars, emptyStars };
};

/**
 * Component that renders the average rating of a movie with stars
 * @param starCount The average rating
 * @param keyPrefix  A key prefix to ensure the uniqueness of each key
 * @returns {Element}
 * @constructor
 */
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

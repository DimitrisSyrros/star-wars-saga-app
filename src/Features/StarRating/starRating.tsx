import React from 'react';
import { StarEmpty, StarFull, StarRatingContainer } from './starRating_style';

/**
 * Calculates how many of the 10 to be rendered
 * stars will be filled and how many will be empty
 * @param starCount The rating based star count
 */
const convertToStarCounts = (starCount?: number) => {
  const fullStars = starCount ? Math.round(starCount) : 0;
  const emptyStars = 10 - fullStars;
  return { fullStars, emptyStars };
};

type StarRatingProps = {
  starCount?: number;
  keyPrefix?: string;
};

/**
 * Component that renders the average rating of a movie with stars
 * @param starCount The average rating
 * @param keyPrefix  A key prefix to ensure the uniqueness of each key
 * @returns {Element}
 * @constructor
 */
const StarRating = ({
  starCount,
  keyPrefix,
}: StarRatingProps): React.JSX.Element => {
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

export default StarRating;

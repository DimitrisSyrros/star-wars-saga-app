import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StarRating from './starRating';

describe('StarRating', () => {
  it('renders the correct number of filled and empty stars', () => {
    const starCount = 7.5;
    const fullStarsCount = Math.round(starCount);
    const emptyStarsCount = 10 - fullStarsCount;

    render(<StarRating starCount={starCount} keyPrefix="test" />);

    const filledStars = screen.getAllByText('★');
    expect(filledStars).toHaveLength(fullStarsCount);

    const emptyStars = screen.getAllByText('☆');
    expect(emptyStars).toHaveLength(emptyStarsCount);
  });
});

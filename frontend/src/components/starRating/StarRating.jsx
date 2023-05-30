import React from 'react';
import { Star, StarBorder } from '@mui/icons-material';
import './starRating.css';

const StarRating = ({ value, className }) => {
  return (
    <div className={className || ''}>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            {ratingValue <= value ? (
              <Star className="star" />
            ) : (
              <StarBorder className="star" />
            )}
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;

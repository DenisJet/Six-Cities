import React from 'react';

import ReviewsItem from '../reviews-item/reviews-item';

import PropTypes from 'prop-types';
import {ReviewsTypes} from '../../../prop-types/reviews-types';

const ReviewsList = ({reviews}) => {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => {
        return (
          <ReviewsItem key={`comment ${review.id}`} review={review} />
        );
      })}
    </ul>
  );
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(ReviewsTypes),
};

export default ReviewsList;

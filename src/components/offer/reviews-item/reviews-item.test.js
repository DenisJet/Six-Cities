import React from 'react';
import {render, screen} from '@testing-library/react';
import ReviewsItem from './reviews-item';
import reviewsMock from '../../../mocks/reviews-mock';

it(`ReviewsItem should render correctly`, () => {
  render(
      <ReviewsItem
        review={reviewsMock[0]}
      />
  );

  expect(screen.getByText(/A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam./i)).toBeInTheDocument();
});

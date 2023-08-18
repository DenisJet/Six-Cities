import React from 'react';
import {render, screen} from '@testing-library/react';
import ReviewsList from './reviews-list';
import reviewsMock from '../../../mocks/reviews-mock';

it(`ReviewsList should render correctly`, () => {
  render(
      <ReviewsList
        reviews={reviewsMock}
      />
  );

  expect(screen.getByText(/A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam./i)).toBeInTheDocument();
});

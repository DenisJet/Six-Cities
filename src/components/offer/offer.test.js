import React from 'react';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import Offer from './offer';
import offersMock from '../../mocks/offers-mock';
import reviewsMock from '../../mocks/reviews-mock';

const mockStore = configureStore({});

it(`WinScreen should be render correctly`, () => {
  const store = mockStore({});

  render(
      <Provider store={store}>
        <Offer
          offer={offersMock[0]}
          reviews={reviewsMock}
        />
      </Provider>
  );

  expect(screen.getByText(/Beautiful & luxurious apartment at great location/i)).toBeInTheDocument();
  expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
});

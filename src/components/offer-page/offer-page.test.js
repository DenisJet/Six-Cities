import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import OfferPage from './offer-page';
import offersMock from '../../mocks/offers-mock';
import reviewsMock from '../../mocks/reviews-mock';

const mockStore = configureStore({});

it(`OfferPage should be render correctly`, () => {
  const store = mockStore({
    DATA: {
      hotel: offersMock[0],
      hotelNearby: offersMock.slice(0, 1),
      comments: reviewsMock,
    },
    USER: {authorizationStatus: ``}
  });
  const id = 1;
  const history = createMemoryHistory();

  history.push(`offer/${id}`);
  store.dispatch = () => Promise.resolve();

  render(
      <Provider store={store}>
        <Router history={history}>
          <OfferPage />
        </Router>
      </Provider>
  );

  expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
  expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
  expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
  expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
});

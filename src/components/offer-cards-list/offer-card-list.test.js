import React from 'react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import OfferCardsList from './offer-cards-list';
import {AppRoute} from '../../const';
import {AuthorizationStatus} from '../../const';
import offersMock from '../../mocks/offers-mock';

const mockStore = configureStore({});

it(`OfferCardsList should render correctly in MainPage`, () => {
  const store = mockStore({
    USER: {authorizationStatus: AuthorizationStatus.NO_AUTH}
  });
  const history = createMemoryHistory();
  history.push(AppRoute.MAIN);

  render(
      <Provider store={store}>
        <Router history={history}>
          <OfferCardsList
            offers={offersMock}
            className={`cities`}
            onMouseEnter={jest.fn()}
            onMouseLeave={jest.fn()}
          />
        </Router>
      </Provider>
  );

  expect(screen.getByText(/Beautiful & luxurious apartment at great location/i)).toBeInTheDocument();
  expect(screen.getByText(/The Pondhouse - A Magical Place/i)).toBeInTheDocument();
  expect(screen.getByText(/The house among olive/i)).toBeInTheDocument();
  expect(screen.getByText(/Perfectly located Castro/i)).toBeInTheDocument();
});

import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import FavoritesPage from './favorites-page';
import {AppRoute, City} from '../../const';
import offersMock from '../../mocks/offers-mock';

const mockStore = configureStore({});

let history;
let store;

describe(`Test FavoritesPage`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
    history.push(AppRoute.FAVORITES);
  });

  it(`Empty FavoritesPage should render correctly`, () => {
    store = mockStore({
      DATA: {
        cities: Object.values(City),
        favoriteOffers: [],
      },
      USER: {
        email: `any@mail.com`,
      },
    });
    store.dispatch = () => Promise.resolve();

    render(
        <Provider store={store}>
          <Router history={history}>
            <FavoritesPage />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
  });

  it(`FavoritesPage should render correctly`, () => {
    store = mockStore({
      DATA: {
        cities: Object.values(City),
        favoriteOffers: offersMock,
      },
      USER: {
        email: `any@mail.com`,
      },
    });
    store.dispatch = () => Promise.resolve();

    render(
        <Provider store={store}>
          <Router history={history}>
            <FavoritesPage />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });
});

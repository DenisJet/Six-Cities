import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import MainPage from './main-page';
import {AppRoute, City, SortType} from '../../const';
import offersMock from '../../mocks/offers-mock';

const mockStore = configureStore({});

it(`MainPage should be render correctly`, () => {
  const store = mockStore({
    DATA: {
      offers: offersMock,
      isDataLoaded: true,
      cities: Object.values(City),
      sortTypes: Object.values(SortType),
    },
    PROCESS: {
      activeCity: City.PARIS,
      activeSortType: SortType.PUPULAR,
    },
    USER: {
      authorizationStatus: ``,
      email: ``,
    },
  });
  const history = createMemoryHistory();

  history.push(AppRoute.MAIN);
  store.dispatch = () => Promise.resolve();

  render(
      <Provider store={store}>
        <Router history={history}>
          <MainPage />
        </Router>
      </Provider>
  );

  expect(screen.getByText(/places to stay in Paris/i)).toBeInTheDocument();
  expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
});

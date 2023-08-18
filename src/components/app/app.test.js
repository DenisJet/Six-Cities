import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './app';
import {City, SortType, AuthorizationStatus} from '../../const';
import offersMock from '../../mocks/offers-mock';

const mockStore = configureStore({});

const initialState = {
  DATA: {
    cities: Object.values(City),
    sortTypes: Object.values(SortType),
    offers: offersMock,
    favoriteOffers: offersMock,
    isDataLoaded: true,
    hotel: {},
    hotelNearby: [],
    comments: []
  },
  PROCESS: {
    activeCity: City.PARIS,
    activeSortType: SortType.PUPULAR,
  },
  USER: {
    authorizationStatus: AuthorizationStatus.AUTH,
    email: `any@mail.com`,
  },
};

describe(`Test routing`, () => {
  jest.spyOn(redux, `useSelector`);
  jest.spyOn(redux, `useDispatch`);

  it(`Render 'MainPage' when user navigate to '/' url`, () => {
    const history = createMemoryHistory();
    const store = mockStore(initialState);

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );


    expect(screen.getByText(/places to stay in/i)).toBeInTheDocument();
  });

  it(`Render 'LoginPage' when user navigate to '/login' url`, () => {
    const history = createMemoryHistory();
    const store = mockStore(initialState);

    history.push(`/login`);

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );


    expect(screen.getByRole(`button`)).toHaveTextContent(/Sign in/i);
  });

  it(`Render 'OfferPage' when user navigate to '/offer:id' url`, () => {
    const history = createMemoryHistory();
    const store = mockStore(initialState);

    history.push(`/offer/1`);
    store.dispatch = () => Promise.resolve();

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App/>
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
  });

  it(`Render 'NotFoundPage' when user navigate to non-existent-route url`, () => {
    const history = createMemoryHistory();
    const store = mockStore(initialState);

    history.push(`/non-existent-route`);

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App/>
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/404. Page not Found/i)).toBeInTheDocument();
  });

  it(`Render 'FavoritesPage' when user navigate to '/favorites' url`, () => {
    const history = createMemoryHistory();
    const store = mockStore(initialState);

    history.push(`/favorites`);
    store.dispatch = () => Promise.resolve();

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });
});

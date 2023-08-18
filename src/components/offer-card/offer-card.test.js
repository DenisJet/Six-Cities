import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import OfferCard from './offer-card';
import {AppRoute, AuthorizationStatus} from '../../const';
import offersMock from '../../mocks/offers-mock';

const mockStore = configureStore({});

let history;
let store;

describe(`Test OfferCard`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
    history.push(AppRoute.MAIN);
    store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NO_AUTH}
    });
  });

  it(`OfferCard should be render correctly`, () => {
    render(
        <Provider store={store}>
          <Router history={history}>
            <OfferCard
              offer={offersMock[0]}
              onMouseEnter={jest.fn()}
              onMouseLeave={jest.fn()}
            />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/Beautiful & luxurious apartment at great location/i)).toBeInTheDocument();
    expect(screen.getByTestId(/favorite-button/i)).toBeInTheDocument();
  });

  it(`Test for mouse action`, () => {
    const mouseEnterHandler = jest.fn();
    const mouseLeaveHandler = jest.fn();

    render(
        <Provider store={store}>
          <Router history={history}>
            <OfferCard
              offer={offersMock[0]}
              onMouseEnter={mouseEnterHandler}
              onMouseLeave={mouseLeaveHandler}
            />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/Beautiful & luxurious apartment at great location/i)).toBeInTheDocument();
    userEvent.hover(screen.getByRole(`article`));
    expect(mouseEnterHandler).toBeCalled();
    userEvent.unhover(screen.getByRole(`article`));
    expect(mouseLeaveHandler).toBeCalled();
  });
});

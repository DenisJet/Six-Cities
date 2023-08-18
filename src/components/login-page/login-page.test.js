import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import LoginPage from './login-page';

const mockStore = configureStore({});

it(`Render 'LoginScreen' when user navigate to '/login' url`, () => {
  const history = createMemoryHistory();
  history.push(`/login`);

  render(
      <redux.Provider store={mockStore({})}>
        <Router history={history}>
          <LoginPage />
        </Router>
      </redux.Provider>
  );

  expect(screen.getByTestId(/email/i)).toBeInTheDocument();
  expect(screen.getByTestId(/password/i)).toBeInTheDocument();

  userEvent.type(screen.getByTestId(`email`), `den@mail.com`);
  userEvent.type(screen.getByTestId(`password`), `123456`);

  expect(screen.getByDisplayValue(/den@mail.com/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
});

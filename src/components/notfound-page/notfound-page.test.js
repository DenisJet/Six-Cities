import React from 'react';
import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import NotFoundPage from './notfound-page';

const mockStore = configureStore({});

it(`NotFoundPage should render correctly`, () => {
  const store = mockStore({
    USER: {authorizationStatus: ``}
  });
  const history = createMemoryHistory();
  history.push(`/non-existent-route`);

  const {getByText} = render(
      <Provider store={store}>
        <Router history={history}>
          <NotFoundPage />
        </Router>
      </Provider>
  );

  const headerElement = getByText(`404. Page not found`);
  const linkElement = getByText(`Вернуться на главную`);

  expect(headerElement).toBeInTheDocument();
  expect(linkElement).toBeInTheDocument();
});


import React from 'react';
import ReactDOM from 'react-dom';

import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';

import {Router as BrowserRouter} from 'react-router-dom';
import browserHistory from "./browser-history";

import rootReducer from './store/root-reducer';
import {requireAuthorization} from './store/actions';
import {checkAuth} from './store/api-actions';
import createAPI from './services/api';
import {redirect} from './store/middlewares/redirect';

import App from './components/app/app';

import {AuthorizationStatus} from './const';

const api = createAPI(() => store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH)));

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      },
    }).concat(redirect)
});

store.dispatch(checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter history={browserHistory}>
        <App />
      </BrowserRouter>
    </Provider>,

    document.getElementById(`root`),
);


import React from 'react';
import {Switch, Route} from 'react-router-dom';

import MainPage from '../main-page/main-page';
import FavoritesPage from '../favorites-page/favorites-page';
import LoginPage from '../login-page/login-page';
import NotFoundPage from '../notfound-page/notfound-page';
import OfferPage from '../offer-page/offer-page';
import PrivateRoute from '../private-route/private-route';

import {AppRoute} from '../../const';

const App = () => {
  return (
    <Switch>
      <Route exact path={AppRoute.MAIN}>
        <MainPage />
      </Route>
      <Route exact path={AppRoute.LOGIN}>
        <LoginPage />
      </Route>
      <PrivateRoute exact
        path={AppRoute.FAVORITES}
        render={() => <FavoritesPage />}
      >
      </PrivateRoute>
      <Route exact path={AppRoute.OFFER}>
        <OfferPage />
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
};

export default App;

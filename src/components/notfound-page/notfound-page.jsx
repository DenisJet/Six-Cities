import React from 'react';
import {Link} from 'react-router-dom';

import {useSelector} from 'react-redux';

import {AppRoute, AuthorizationStatus} from '../../const';

const NotFoundPage = () => {
  const {authorizationStatus, email} = useSelector((state) => state.USER);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.MAIN}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={AppRoute.FAVORITES}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">
                      {authorizationStatus === AuthorizationStatus.AUTH ? email : `Sing in`}
                    </span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1>404. Page not found</h1>
        <Link to={AppRoute.MAIN}>Вернуться на главную</Link>
      </main>
    </div>
  );
};

export default NotFoundPage;

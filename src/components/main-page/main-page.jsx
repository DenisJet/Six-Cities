import React, {useState, useCallback, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import OfferCardsList from '../offer-cards-list/offer-cards-list';
import Map from '../map/map';
import CitiesList from '../cities-list/citiesilist';
import Sort from '../sort/sort';
import LoadingScreen from '../loading-screen/loading-screen';
import EmptyPage from '../empty-page/empty-page';

import {AppRoute, AuthorizationStatus} from '../../const';

import {cityChange, sortChange} from '../../store/actions';
import {fetchOffers} from '../../store/api-actions';
import {selectOffersByActiveCityAndActiveSortType} from '../../store/selectors';

const MainPage = () => {

  const {isDataLoaded, cities, sortTypes} = useSelector((state) => state.DATA);
  const {activeCity, activeSortType} = useSelector((state) => state.PROCESS);
  const {authorizationStatus, email} = useSelector((state) => state.USER);

  const dispatch = useDispatch();

  const [activeOffer, setActiveOffer] = useState(null);
  const actualOffers = useSelector(selectOffersByActiveCityAndActiveSortType);

  const handleMouseEnter = useCallback((offer) => {
    setActiveOffer(offer);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveOffer(null);
  }, []);

  const onCityChange = (city) => {
    dispatch(cityChange(city));
  };

  const onSortChange = (type) => {
    dispatch(sortChange(type));
  };

  useEffect(() => {
    if (!isDataLoaded) {
      dispatch(fetchOffers());
    }
  }, [isDataLoaded]);

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
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
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList cities={cities} activeCity={activeCity} onClick={onCityChange} />
          </section>
        </div>
        <div className="cities">
          {actualOffers.length && actualOffers.length > 0 ?
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{actualOffers.length} places to stay in {activeCity}</b>
                <Sort sortTypes={sortTypes} activeSortType={activeSortType} onClick={onSortChange} />
                <OfferCardsList offers={actualOffers}
                  className={`cities`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave} />
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map offers={actualOffers} activeOffer={activeOffer} />
                </section>
              </div>
            </div>
            : <EmptyPage />}
        </div>
      </main>
    </div>
  );
};

export default MainPage;

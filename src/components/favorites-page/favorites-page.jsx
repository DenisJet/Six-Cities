import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {AppRoute} from '../../const';
import {fetchFavoriteOffers, postFavoriteOffer} from '../../store/api-actions';

const STAR_WIDTH = 20;

const FavoritesPage = () => {
  const {cities, favoriteOffers} = useSelector((state) => state.DATA);
  const {email} = useSelector((state) => state.USER);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteOffers());
  }, []);

  const handleFavoriteClick = (offer) => {
    const offerId = offer.id;
    const status = Number(!offer.isFavorite);

    dispatch(postFavoriteOffer(offerId, status))
    .then(() => {
      dispatch(fetchFavoriteOffers());
    });
  };

  favoriteOffers.forEach((offer) => {
    const city = offer.city.name;
    if (!cities.includes(city)) {
      cities.push(city);
    }
  });

  return (
    <div className="page">
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
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.FAVORITES}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">{email}</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favoriteOffers.length ?
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {cities.map((city) => {
                  return (
                    <li key={city} className="favorites__locations-items">
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <Link className="locations__item-link" to={AppRoute.MAIN}>
                            <span>{city}</span>
                          </Link>
                        </div>
                      </div>
                      <div className="favorites__places">
                        {favoriteOffers.slice().filter((offer) => offer.city.name === city).map((offer) => {
                          return (
                            <article key={offer.id} className="favorites__card place-card">
                              <div className="favorites__image-wrapper place-card__image-wrapper">
                                <Link to={`offer/${offer.id}`}>
                                  <img className="place-card__image" src={offer.previewImage} width="150" height="110" alt="Place image" />
                                </Link>
                              </div>
                              <div className="favorites__card-info place-card__info">
                                <div className="place-card__price-wrapper">
                                  <div className="place-card__price">
                                    <b className="place-card__price-value">&euro;{offer.price}</b>
                                    <span className="place-card__price-text">&#47;&nbsp;night</span>
                                  </div>
                                  <button className="place-card__bookmark-button place-card__bookmark-button--active button"
                                    type="button"
                                    onClick={() => handleFavoriteClick(offer)}>
                                    <svg className="place-card__bookmark-icon" width="18" height="19">
                                      <use xlinkHref="#icon-bookmark"></use>
                                    </svg>
                                    <span className="visually-hidden">In bookmarks</span>
                                  </button>
                                </div>
                                <div className="place-card__rating rating">
                                  <div className="place-card__stars rating__stars">
                                    <span style={{width: `${offer.rating * STAR_WIDTH}%`}} />
                                    <span className="visually-hidden">Rating</span>
                                  </div>
                                </div>
                                <h2 className="place-card__name">
                                  <Link to={`offer/${offer.id}`}>{offer.title}</Link>
                                </h2>
                                <p className="place-card__type">{offer.type}</p>
                              </div>
                            </article>
                          );
                        })}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
            :
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>}
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.MAIN}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
};

export default FavoritesPage;

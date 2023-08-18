import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useParams} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';

import Offer from '../offer/offer';
import Map from '../map/map';
import OfferCardsList from '../offer-cards-list/offer-cards-list';

import {AppRoute, AuthorizationStatus} from '../../const';

import {fetchComments, fetchHotel, fetchHotelNearby} from '../../store/api-actions';

const OfferPage = () => {
  const {hotel, hotelNearby, comments} = useSelector((state) => state.DATA);
  const {authorizationStatus, email} = useSelector((state) => state.USER);

  const dispatch = useDispatch();
  const id = Number(useParams().id);

  useEffect(() => {
    dispatch(fetchHotel(id));
    dispatch(fetchHotelNearby(id));
    dispatch(fetchComments(id));
  }, [id]);

  const mapOffers = hotelNearby.concat(hotel);

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
      <main className="page__main page__main--property">
        <section className="property">
          <Offer offer={hotel}
            reviews={comments}
            authorizationStatus={authorizationStatus}
          />
          <section className="property__map map">
            {hotelNearby && hotelNearby.length && hotel &&
              <Map offers={mapOffers} activeOffer={hotel}/>
            }
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OfferCardsList offers={hotelNearby} isOfferPage={true} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default OfferPage;

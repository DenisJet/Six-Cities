import React from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import NewReview from './new-review/new-review';
import ReviewsList from './reviews-list/reviews-list';

import PropTypes from 'prop-types';
import {OfferTypes} from '../../prop-types/offer-types';
import {ReviewsTypes} from '../../prop-types/reviews-types';

import {AuthorizationStatus, AppRoute} from '../../const';
import {fetchFavoriteOffers, postFavoriteOffer} from '../../store/api-actions';

const STAR_WIDTH = 20;

const Offer = ({offer, reviews, authorizationStatus}) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const handleFavoriteClick = () => {
    if (authorizationStatus === AuthorizationStatus.AUTH) {
      const offerId = offer.id;
      const status = Number(!offer.isFavorite);

      dispatch(postFavoriteOffer(offerId, status))
      .then(() => {
        dispatch(fetchFavoriteOffers());
      });
    } else {
      history.push(AppRoute.LOGIN);
    }
  };

  return (
    <>
      {offer.images && offer.images.length && (
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {
              offer.images.map((image) => {
                return (<div key={`${offer.id}-${image}`} className="property__image-wrapper">
                  <img className="property__image" src={image} alt="Photo studio" />
                </div>);
              })}
          </div>
        </div>
      )}
      <div className="property__container container">
        <div className="property__wrapper">
          {offer.isPremium && (
            <div className="property__mark">
              <span>Premium</span>
            </div>
          )}
          <div className="property__name-wrapper">
            <h1 className="property__name">
              {offer.title}
            </h1>
            <button className={`property__bookmark-button ${offer.isFavorite ? `property__bookmark-button--active` : ``} button`}
              type="button" onClick={handleFavoriteClick}>
              <svg className="property__bookmark-icon" width="31" height="33">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="property__rating rating">
            <div className="property__stars rating__stars">
              <span style={{width: `${offer.rating * STAR_WIDTH}%`}} />
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="property__rating-value rating__value">{offer.rating}</span>
          </div>
          <ul className="property__features">
            <li className="property__feature property__feature--entire">
              {offer.type}
            </li>
            <li className="property__feature property__feature--bedrooms">
              {offer.bedrooms} Bedrooms
            </li>
            <li className="property__feature property__feature--adults">
                  Max {offer.maxAdults} adults
            </li>
          </ul>
          <div className="property__price">
            <b className="property__price-value">&euro;{offer.price}</b>
            <span className="property__price-text">&nbsp;night</span>
          </div>
          {offer.images && offer.images.length && (
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {offer.goods.map((good) => {
                  return (<li key={good} className="property__inside-item">
                    {good}
                  </li>);
                })}
              </ul>
            </div>
          )}
          <div className="property__host">
            <h2 className="property__host-title">Meet the host</h2>
            <div className="property__host-user user">
              <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                <img className="property__avatar user__avatar" src={offer.avatarUrl} width="74" height="74" alt="Host avatar" />
              </div>
              <span className="property__user-name">
                {offer.name}
              </span>
              <span className="property__user-status">
                {`${offer.isPro ? `Pro` : ``}`}
              </span>
            </div>
            <div className="property__description">
              <p className="property__text">
                {offer.description}
              </p>
              <p className="property__text">
                {offer.description}
              </p>
            </div>
          </div>
          <section className="property__reviews reviews">
            <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
            <ReviewsList reviews={reviews} />
            {authorizationStatus === AuthorizationStatus.AUTH ? <NewReview offerId={offer.id} /> : ``}
          </section>
        </div>
      </div>
    </>
  );
};

Offer.propTypes = {
  offer: OfferTypes.isRequired,
  reviews: PropTypes.arrayOf(ReviewsTypes),
  authorizationStatus: PropTypes.string,
  onFavoriteClick: PropTypes.func,
};

export default Offer;

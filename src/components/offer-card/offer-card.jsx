import React from 'react';
import {Link, useHistory} from 'react-router-dom';

import PropTypes from "prop-types";
import {OfferTypes} from '../../prop-types/offer-types';

import {useDispatch, useSelector} from 'react-redux';
import {fetchFavoriteOffers, postFavoriteOffer} from '../../store/api-actions';

import {AuthorizationStatus, AppRoute} from '../../const';

const STAR_WIDTH = 20;

const OfferCard = ({offer, onMouseEnter, onMouseLeave, isOfferPage}) => {
  const activeBookmarkClass = offer.isFavorite ? `place-card__bookmark-button--active` : ``;
  const cardClassName = isOfferPage ? `near-places__card place-card` : `cities__place-card place-card`;
  const imageWrapperClassName = isOfferPage ? `near-places__image-wrapper place-card__image-wrapper` : `cities__image-wrapper place-card__image-wrapper`;

  const {authorizationStatus} = useSelector((state) => state.USER);

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
    <article className={cardClassName}
      onMouseEnter={(evt) => onMouseEnter(offer, evt)}
      onMouseLeave={(evt) => onMouseLeave(evt)}>
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={imageWrapperClassName}>
        <Link to={`offer/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${activeBookmarkClass} button`}
            type="button"
            onClick={handleFavoriteClick}
            data-testid="favorite-button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${offer.rating * STAR_WIDTH}%`}}></span>
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
};

OfferCard.defaultProps = {
  item: {},
  onMouseEnter: () => undefined,
  onMouseLeave: () => undefined,
};

OfferCard.propTypes = {
  offer: OfferTypes.isRequired,
  isOfferPage: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

export default OfferCard;

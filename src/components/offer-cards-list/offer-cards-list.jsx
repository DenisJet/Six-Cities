import React from 'react';

import OfferCard from '../offer-card/offer-card';

import PropTypes from 'prop-types';
import {OfferTypes} from '../../prop-types/offer-types';

const OfferCardsList = ({offers, isOfferPage, onMouseEnter, onMouseLeave}) => {
  const className = isOfferPage ? `near-places__list places__list` : `cities__places-list places__list tabs__content`;

  return (
    <div className={className}>
      {offers.map((offer) => {
        return (
          <OfferCard
            key={offer.id}
            offer={offer}
            isOfferPage={isOfferPage}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave} />
        );
      })}
    </div>
  );
};

OfferCardsList.propTypes = {
  offers: PropTypes.arrayOf(OfferTypes).isRequired,
  isOfferPage: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

export default OfferCardsList;

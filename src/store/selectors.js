import {createSelector} from "@reduxjs/toolkit";
import {NameSpace} from "./root-reducer";
import {SortType} from "../const";

const selectAllOffers = (state) => state[NameSpace.DATA].offers;
const seleActiveCity = (state) => state[NameSpace.PROCESS].activeCity;
const selectActiveSortType = (state) => state[NameSpace.PROCESS].activeSortType;

const sortPriceToHigh = (offers) => {
  return offers.slice().sort((a, b) => a.price - b.price);
};

const sortPriceToLow = (offers) => {
  return offers.slice().sort((a, b) => b.price - a.price);
};

const sortTopRated = (offers) => {
  return offers.slice().sort((a, b) => b.rating - a.rating);
};

const selectOffersByActiveCityAndActiveSortType = createSelector(
    [selectAllOffers, seleActiveCity, selectActiveSortType],
    (allOffers, activeCity, activeSortType) => {
      const offersForActiveCity = allOffers.filter((offer) => offer.city.name === activeCity);

      if (activeSortType === SortType.PRICE_HIGH_TO_LOW) {
        return sortPriceToLow(offersForActiveCity);
      }

      if (activeSortType === SortType.PRICE_LOW_TO_HIGH) {
        return sortPriceToHigh(offersForActiveCity);
      }

      if (activeSortType === SortType.TOP_RATED_FIRST) {
        return sortTopRated(offersForActiveCity);
      }

      return offersForActiveCity;
    }
);

export {selectOffersByActiveCityAndActiveSortType};

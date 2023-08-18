import {createReducer} from "@reduxjs/toolkit";
import {getComments, getHotel, getHotelNearby, getOffers, getFavoriteOffers, updateOffer} from "../actions";
import {City, SortType} from '../../const';

const initialState = {
  cities: Object.values(City),
  sortTypes: Object.values(SortType),
  offers: [],
  favoriteOffers: [],
  isDataLoaded: false,
  hotel: {},
  hotelNearby: [],
  comments: [],
};

const appData = createReducer(initialState, (builder) => {
  builder.addCase(getOffers, (state, action) => {
    return {
      ...state,
      offers: action.payload,
      isDataLoaded: true,
    };
  });
  builder.addCase(getFavoriteOffers, (state, action) => {
    return {
      ...state,
      favoriteOffers: action.payload
    };
  });
  builder.addCase(updateOffer, (state, action) => {
    return {
      ...state,
      offers: [
        ...state.offers.slice(0, action.payload.id - 1),
        action.payload,
        ...state.offers.slice(action.payload.id, state.offers.length)
      ],
      hotel: action.payload,
    };
  });
  builder.addCase(getHotel, (state, action) => {
    return {
      ...state,
      hotel: action.payload
    };
  });
  builder.addCase(getHotelNearby, (state, action) => {
    return {
      ...state,
      hotelNearby: action.payload
    };
  });
  builder.addCase(getComments, (state, action) => {
    return {
      ...state,
      comments: action.payload
    };
  });
});

export {appData, initialState};

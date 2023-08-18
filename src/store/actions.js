import {createAction} from "@reduxjs/toolkit";

const ActionType = {
  GET_OFFERS: `main/getOffers`,
  GET_FAVORITE_OFFERS: `main/getFaforiteOffers`,
  UPDATE_OFFER: `main/updateOffer`,
  CITY_CHANGE: `main/cityChange`,
  SORT_CHANGE: `main/sortChange`,
  REDIRECT_TO_ROUTE: `main/redirectToRoute`,
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
  GET_USER_DATA: `user/getUserData`,
  GET_HOTTEL: `offer/getHotel`,
  GET_HOTTEL_NEARBY: `offer/getHotelNearby`,
  GET_COMMENTS: `offer/getComments`,
};

const getOffers = createAction(ActionType.GET_OFFERS, (offers) => {
  return {
    payload: offers,
  };
});

const updateOffer = createAction(ActionType.UPDATE_OFFER, (offer) => {
  return {
    payload: offer,
  };
});

const cityChange = createAction(ActionType.CITY_CHANGE, (cityName) => {
  return {
    payload: cityName,
  };
});

const sortChange = createAction(ActionType.SORT_CHANGE, (sortType) => {
  return {
    payload: sortType,
  };
});

const requireAuthorization = createAction(ActionType.REQUIRED_AUTHORIZATION, (status) => {
  return {
    payload: status,
  };
});

const redirectToRoute = createAction(ActionType.REDIRECT_TO_ROUTE, (url) => {
  return {
    payload: url,
  };
});

const getUserData = createAction(ActionType.GET_USER_DATA, (email) => {
  return {
    payload: email,
  };
});

const getHotel = createAction(ActionType.GET_HOTTEL, (hotel) => {
  return {
    payload: hotel,
  };
});

const getHotelNearby = createAction(ActionType.GET_HOTTEL_NEARBY, (hotelNearby) => {
  return {
    payload: hotelNearby,
  };
});

const getComments = createAction(ActionType.GET_COMMENTS, (comments) => {
  return {
    payload: comments,
  };
});

const getFavoriteOffers = createAction(ActionType.GET_FAVORITE_OFFERS, (favoriteOffers) => {
  return {
    payload: favoriteOffers,
  };
});

export {
  ActionType,
  getOffers,
  updateOffer,
  cityChange,
  sortChange,
  requireAuthorization,
  redirectToRoute,
  getUserData,
  getHotel,
  getHotelNearby,
  getComments,
  getFavoriteOffers,
};

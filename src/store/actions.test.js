import {
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
} from './actions';

describe(`Action creators work correctly`, () => {
  it(`Action creator for get offers work correctly`, () => {
    const expectedAction = {
      type: ActionType.GET_OFFERS,
      payload: [],
    };

    const offers = [];

    expect(getOffers(offers)).toEqual(expectedAction);
  });

  it(`Action creator for update offer work correctly`, () => {
    const expectedAction = {
      type: ActionType.UPDATE_OFFER,
      payload: {},
    };

    const offer = {};

    expect(updateOffer(offer)).toEqual(expectedAction);
  });

  it(`Action creator for city change work correctly`, () => {
    const expectedAction = {
      type: ActionType.CITY_CHANGE,
      payload: ``,
    };

    const city = ``;

    expect(cityChange(city)).toEqual(expectedAction);
  });

  it(`Action creator for sort change work correctly`, () => {
    const expectedAction = {
      type: ActionType.SORT_CHANGE,
      payload: ``,
    };

    const sortType = ``;

    expect(sortChange(sortType)).toEqual(expectedAction);
  });

  it(`Action creator for authorization status is true work correctly`, () => {
    const expectedAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: true,
    };

    const status = true;

    expect(requireAuthorization(status)).toEqual(expectedAction);
  });

  it(`Action creator for authorization status is false work correctly`, () => {
    const expectedAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: false,
    };

    const status = false;

    expect(requireAuthorization(status)).toEqual(expectedAction);
  });

  it(`Action creator for redirect to route work correctly`, () => {
    const expectedAction = {
      type: ActionType.REDIRECT_TO_ROUTE,
      payload: ``,
    };

    const url = ``;

    expect(redirectToRoute(url)).toEqual(expectedAction);
  });

  it(`Action creator for getUserData work correctly`, () => {
    const expectedAction = {
      type: ActionType.GET_USER_DATA,
      payload: ``,
    };

    const email = ``;

    expect(getUserData(email)).toEqual(expectedAction);
  });

  it(`Action creator for getHotel work correctly`, () => {
    const expectedAction = {
      type: ActionType.GET_HOTTEL,
      payload: {},
    };

    const hotel = {};

    expect(getHotel(hotel)).toEqual(expectedAction);
  });

  it(`Action creator for getHotelNearby work correctly`, () => {
    const expectedAction = {
      type: ActionType.GET_HOTTEL_NEARBY,
      payload: [],
    };

    const hotelNearby = [];

    expect(getHotelNearby(hotelNearby)).toEqual(expectedAction);
  });

  it(`Action creator for getComments work correctly`, () => {
    const expectedAction = {
      type: ActionType.GET_COMMENTS,
      payload: [],
    };

    const comments = [];

    expect(getComments(comments)).toEqual(expectedAction);
  });

  it(`Action creator for getFavoriteOffers work correctly`, () => {
    const expectedAction = {
      type: ActionType.GET_FAVORITE_OFFERS,
      payload: [],
    };

    const favoriteOffers = [];

    expect(getFavoriteOffers(favoriteOffers)).toEqual(expectedAction);
  });
});

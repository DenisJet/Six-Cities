/* eslint-disable max-nested-callbacks */
import MockAdapter from 'axios-mock-adapter';
import createAPI from '../../services/api';
import {appData, initialState} from './app-data';
import {ActionType, getComments, getHotel, getHotelNearby, updateOffer} from '../actions';
import offersMock from '../../mocks/offers-mock';
import reviewsMock from '../../mocks/reviews-mock';
import {APIRoute} from '../../const';
import {fetchOffers, fetchHotel, fetchHotelNearby, fetchComments, postComment, fetchFavoriteOffers, postFavoriteOffer} from '../api-actions';

const api = createAPI(() => { });
const offers = offersMock;
const comments = reviewsMock;
const favoriteOffers = offersMock;

describe(`Reducer 'appData' should work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(appData(undefined, {})).toEqual(initialState);
  });

  it(`Reducer should update offers by get offers`, () => {
    const state = {offers: [], isDataLoaded: false};
    const loadOffersAction = {
      type: ActionType.GET_OFFERS,
      payload: offers,
    };

    expect(appData(state, loadOffersAction)).toEqual({offers, isDataLoaded: true});
  });

  it(`Reducer should update favorite offers by get favorite offers`, () => {

    const state = {favoriteOffers: []};
    const loadFavoriteOffersAction = {
      type: ActionType.GET_FAVORITE_OFFERS,
      payload: favoriteOffers,
    };

    expect(appData(state, loadFavoriteOffersAction)).toEqual({favoriteOffers});

    // альтернативный способ решения задачи
    // expect(appData(initialState, getFavoriteOffers(offers))).toEqual({...initialState, favoriteOffers});
  });

  it(`Reducer should update comments by get comments`, () => {
    expect(appData(initialState, getComments(comments))).toEqual({...initialState, comments});
  });

  it(`Reducer should update hotel by get hotel`, () => {
    const hotel = offers[0];

    expect(appData(initialState, getHotel(hotel))).toEqual({...initialState, hotel});
  });

  it(`Reducer should update hotel nearby by get hotel nearby`, () => {
    const hotelNearby = [offers[0], offers[1], offers[2]];

    expect(appData(initialState, getHotelNearby(hotelNearby))).toEqual({...initialState, hotelNearby});
  });

  it(`Reducer should update offer by update offer`, () => {
    const updatedOffer = {...offers[0], isFaforite: true};

    expect(appData(initialState, updateOffer(updatedOffer)))
      .toEqual({
        ...initialState,
        offers: [
          ...initialState.offers.slice(0, updatedOffer.id - 1),
          updatedOffer,
          ...initialState.offers.slice(updatedOffer.id, initialState.offers.length)
        ],
        hotel: updatedOffer,
      });
  });
});

describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call for load offers`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = fetchOffers();

    apiMock
      .onGet(APIRoute.HOTELS)
      .reply(200, []);

    return offersLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.GET_OFFERS,
          payload: [],
        });
      });
  });

  it(`Should make a correct API call for load hotel`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = 1;
    const hotelLoader = fetchHotel(id);

    apiMock
      .onGet(`${APIRoute.HOTELS}/${id}`)
      .reply(200, {
        host: {
          [`avatar_url`]: ``,
          [`is_pro`]: false,
        },
        [`is_favorite`]: false,
        [`is_premium`]: false,
        [`max_adults`]: 3,
        [`preview_image`]: ``,
      });

    return hotelLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.GET_HOTTEL,
          payload: {
            avatarUrl: ``,
            isPro: false,
            isFavorite: false,
            isPremium: false,
            maxAdults: 3,
            previewImage: ``,
            host: {},
          }
        });
      });
  });

  it(`Should make a correct API call for load hotel nearby`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = 1;
    const hotelNearbyLoader = fetchHotelNearby(id);

    apiMock
      .onGet(`${APIRoute.HOTELS}/${id}${APIRoute.NEARBY}`)
      .reply(200, []);

    return hotelNearbyLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.GET_HOTTEL_NEARBY,
          payload: [],
        });
      });
  });

  it(`Should make a correct API call for load comments`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = 1;
    const commentsLoader = fetchComments(id);

    apiMock
      .onGet(`${APIRoute.COMMENTS}/${id}`)
      .reply(200, []);

    return commentsLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.GET_COMMENTS,
          payload: [],
        });
      });
  });

  it(`Should make a correct API call for post comment`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offerId = 1;
    const comment = {
      comment: `A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam.`,
      date: `2019-05-08T14:13:56.569Z`,
      id: 1,
      rating: 4,
      user: {
        avatarUrl: `img/avatar-max.jpg`,
        id: 4,
        isPro: false,
        name: `Max`
      }
    };
    const commentPoster = postComment(offerId, comment, comment.rating);

    apiMock
      .onPost(`${APIRoute.COMMENTS}/${offerId}`)
      .reply(200, []);

    return commentPoster(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.GET_COMMENTS,
          payload: [],
        });
      });
  });

  it(`Should make a correct API call for load favorite offers`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoriteOffersLoader = fetchFavoriteOffers();

    apiMock
      .onGet(APIRoute.FAVORITE)
      .reply(200, []);

    return favoriteOffersLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.GET_FAVORITE_OFFERS,
          payload: [],
        });
      });
  });

  it(`Should make a correct API call for post favorite offer`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offerId = 1;
    const status = 1;
    const favoriteOfferPoster = postFavoriteOffer(offerId, status);

    apiMock
      .onPost(`${APIRoute.FAVORITE}/${offerId}/${status}`)
      .reply(200, {
        host: {
          [`avatar_url`]: ``,
          [`is_pro`]: false,
        },
        [`is_favorite`]: false,
        [`is_premium`]: false,
        [`max_adults`]: 3,
        [`preview_image`]: ``,
      });

    return favoriteOfferPoster(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_OFFER,
          payload: {
            avatarUrl: ``,
            isPro: false,
            isFavorite: false,
            isPremium: false,
            maxAdults: 3,
            previewImage: ``,
            host: {},
          },
        });
      });
  });
});

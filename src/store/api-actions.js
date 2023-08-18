import {
  getOffers, getHotel, getHotelNearby, getComments,
  requireAuthorization, getUserData, redirectToRoute, getFavoriteOffers, updateOffer
} from "./actions";
import {AuthorizationStatus, AppRoute, APIRoute} from "../const";

const adaptOfferToClient = (offer) => {
  const adaptedOffer = Object.assign(
      {},
      offer,
      {
        avatarUrl: offer.host.avatar_url,
        isPro: offer.host.is_pro,
        isFavorite: offer.is_favorite,
        isPremium: offer.is_premium,
        maxAdults: offer.max_adults,
        previewImage: offer.preview_image,
      },
  );

  delete adaptedOffer.host.avatar_url;
  delete adaptedOffer.host.is_pro;
  delete adaptedOffer.is_favorite;
  delete adaptedOffer.is_premium;
  delete adaptedOffer.max_adults;
  delete adaptedOffer.preview_image;

  return adaptedOffer;
};

export const adaptCommentToClient = (comment) => {
  const adaptedComment = Object.assign(
      {},
      comment,
      {
        avatarUrl: comment.user.avatar_url,
        isPro: comment.user.is_pro,
        id: comment.user.id,
        name: comment.user.name,
      },
  );

  delete adaptedComment.user.avatar_url;
  delete adaptedComment.user.is_pro;
  delete adaptedComment.user.id;
  delete adaptedComment.user.name;

  return adaptedComment;
};

const fetchOffers = () => (dispatch, _getState, api) => (
  api.get(APIRoute.HOTELS)
    .then(({data}) => dispatch(getOffers(data.map((item) => {
      return adaptOfferToClient(item);
    }))))
);

const fetchHotel = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.HOTELS}/${id}`)
    .then(({data}) => dispatch(getHotel(adaptOfferToClient(data))))
);

const fetchHotelNearby = (offerId) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.HOTELS}/${offerId}${APIRoute.NEARBY}`)
    .then(({data}) => dispatch(getHotelNearby(data.map((item) => {
      return adaptOfferToClient(item);
    }))))
);

const fetchComments = (offerId) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.COMMENTS}/${offerId}`)
    .then(({data}) => dispatch(getComments(data.map((item) => {
      return adaptCommentToClient(item);
    }))))
);

const postComment = (offerId, comment, rating) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.COMMENTS}/${offerId}`, {comment, rating})
    .then(({data}) => dispatch(getComments(data.map((item) => {
      return adaptCommentToClient(item);
    }))))
);

const fetchFavoriteOffers = () => (dispatch, _getState, api) => (
  api.get(APIRoute.FAVORITE)
    .then(({data}) => dispatch(getFavoriteOffers(data.map((item) => {
      return adaptOfferToClient(item);
    }))))
);

const postFavoriteOffer = (offerId, status) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.FAVORITE}/${offerId}/${status}`)
    .then(({data}) => dispatch(updateOffer(adaptOfferToClient(data))))
);

const checkAuth = () => (dispatch, _getState, api) => (
  api.get(AppRoute.LOGIN)
    .then(({data}) => {
      dispatch(requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(getUserData(data.email));
    })
    .catch(() => { })
);

const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(AppRoute.LOGIN, {email, password})
    .then(({data}) => {
      dispatch(requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(getUserData(data.email));
    })
    .then(() => dispatch(redirectToRoute(`/`)))
);

export {
  fetchOffers,
  fetchHotelNearby,
  fetchHotel,
  fetchComments,
  checkAuth,
  login,
  postComment,
  fetchFavoriteOffers,
  postFavoriteOffer,
};

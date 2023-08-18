import {NameSpace} from "../root-reducer";

const getOffers = (state) => state[NameSpace.DATA].offers;
const getHotel = (state) => state[NameSpace.DATA].hotel;
const getHotelNearby = (state) => state[NameSpace.DATA].hotelNearby;
const getComments = (state) => state[NameSpace.DATA].comments;
const getLoadedStatus = (state) => state[NameSpace.DATA].isDataLoaded;

export {getOffers, getHotel, getHotelNearby, getComments, getLoadedStatus};

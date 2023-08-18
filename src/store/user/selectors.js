import {NameSpace} from "../root-reducer";

const getAuthorizationStatus = (state) => state[NameSpace.USER].authorizationStatus;
const getEmail = (state) => state[NameSpace.USER].email;

export {getAuthorizationStatus, getEmail};

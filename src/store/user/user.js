import {createReducer} from '@reduxjs/toolkit';
import {requireAuthorization, getUserData} from '../actions';
import {AuthorizationStatus} from '../../const';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  email: ``,
};

const user = createReducer(initialState, (builder) => {
  builder.addCase(requireAuthorization, (state, action) => {
    return {
      ...state,
      authorizationStatus: action.payload,
    };
  });
  builder.addCase(getUserData, (state, action) => {
    return {
      ...state,
      email: action.payload
    };
  });
});

export {user, initialState};

import {createReducer} from "@reduxjs/toolkit";
import {cityChange, sortChange} from "../actions";
import {City, SortType} from "../../const";

const initialState = {
  activeCity: City.PARIS,
  activeSortType: SortType.PUPULAR,
};

const appProcess = createReducer(initialState, (builder) => {
  builder.addCase(cityChange, (state, action) => {
    return {
      ...state,
      activeCity: action.payload,
    };
  });
  builder.addCase(sortChange, (state, action) => {
    return {
      ...state,
      activeSortType: action.payload
    };
  });
});

export {appProcess};

import {appProcess} from "./app-process";
import {sortChange, cityChange} from "../actions";
import {City, SortType} from "../../const";

describe(`Reducers work correctly`, () => {
  it(`Reducer without changed parameters should return initial state`, () => {
    expect(appProcess({activeCity: City.PARIS, activeSortType: SortType.PUPULAR}, cityChange(City.PARIS)))
      .toEqual({activeCity: City.PARIS, activeSortType: SortType.PUPULAR});

    expect(appProcess({activeCity: City.PARIS, activeSortType: SortType.PUPULAR}, sortChange(SortType.PUPULAR)))
      .toEqual({activeCity: City.PARIS, activeSortType: SortType.PUPULAR});
  });

  it(`Reducer should change active city`, () => {
    const state = {activeCity: City.PARIS, activeSortType: SortType.PUPULAR};

    expect(appProcess(state, cityChange(City.HAMBURG)))
      .toEqual({activeCity: City.HAMBURG, activeSortType: SortType.PUPULAR});
  });

  it(`Reducer should change sort type`, () => {
    const state = {activeCity: City.PARIS, activeSortType: SortType.PUPULAR};

    expect(appProcess(state, sortChange(SortType.TOP_RATED_FIRST)))
      .toEqual({activeCity: City.PARIS, activeSortType: SortType.TOP_RATED_FIRST});
  });
});

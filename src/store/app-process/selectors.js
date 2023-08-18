import {NameSpace} from "../root-reducer";

const getActiveCity = (state) => state[NameSpace.PROCESS].activeCity;
const getActiveSortType = (state) => state[NameSpace.PROCESS].activeSortType;

export {getActiveCity, getActiveSortType};

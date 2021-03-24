import {createSelector} from 'reselect';

const missionsState = (state) => state.missionsReducer;

export const makeSelectMissions = createSelector(missionsState, missions => missions.favourites);
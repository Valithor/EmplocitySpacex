import {createSelector} from 'reselect';
import { makeSelectMissions } from '../store/selectors/missions.selectors';
import { addFavourite, removeFavourite } from '../store/actions/missions.actions';


export const stateSelector = createSelector(makeSelectMissions, (favourites) => ({
    favourites,
  }));
export const actionDispatch = (dispatch) =>({
    setFavourites: (favourites) => dispatch(addFavourite(favourites)),
    removeFavourites: (favourites)=> dispatch(removeFavourite(favourites))
  
  });
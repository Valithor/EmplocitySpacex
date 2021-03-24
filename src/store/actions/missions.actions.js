import {FAVOURITE_ADD, FAVOURITE_REMOVE} from '../../utils/constants'

export const addFavourite = (index) => {
    return {
      type: FAVOURITE_ADD,
      payload: {
        index
      }
    };
  };

 export const removeFavourite = (index) => {
   return {
     type: FAVOURITE_REMOVE,
     payload: {
       index
     }
   };
 };
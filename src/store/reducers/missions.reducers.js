import { FAVOURITE_ADD, FAVOURITE_REMOVE } from "../../utils/constants";

const FavouritesStoreState = {
    favourites: []
}

export default function missionsReducer(state = FavouritesStoreState, action){
    switch (action.type){
        case FAVOURITE_ADD:
            return {
                ...state,
                favourites: [...state.favourites, action.payload.index]
              };        
        case FAVOURITE_REMOVE:
            return {
                ...state,
                favourites: state.favourites.filter(fav =>fav.id !== action.payload.index)
              };
        default:
            return state;
    }
    
}
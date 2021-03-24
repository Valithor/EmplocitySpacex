import {createStore, combineReducers} from 'redux'
import missionsReducer from './reducers/missions.reducers'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'app',
    storage,
  }

  const reducers = combineReducers({missionsReducer});

  const persistedReducer = persistReducer(persistConfig, reducers)

  export const store = createStore(persistedReducer);
  export const persistor = persistStore(store);



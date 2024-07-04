import { createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import persistConfig from '../managestore/persistconfig';
import rootReducer from '../reducer/reducer';

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);


import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import rootReducer from '../reducers';

import sessionReducer from '../reducers/sessionReducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['session']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));

const persistor = persistStore(store);

export {
    persistor,
    store
}
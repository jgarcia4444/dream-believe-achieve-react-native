
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import rootReducer from '../reducers';

import sessionReducer from '../reducers/sessionReducer';
import createMigrate from 'redux-persist/es/createMigrate';

const migrations = {
    0: state => {
        return {
            ...state,
            session: {
                ...state.session,
                dailyQuote: {
                    ...state.dailyQuote,
                    quoteOfTheDayDate: '',
                    quoteInfo: {
                        ...state.session.dailyQuote.quoteInfo,
                        id: '',
                        quote: '',
                        author: ''
                    },
                    dailyQuoteLoading: false,
                    dailyQuoteError: '',
                },
                favoriteQuotes: []
            }
        }
    },
}

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['session'],
    version: 0,
    debug: true,
    migrate: createMigrate(migrations, {debug: true}),
    timeout: null,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));

const persistor = persistStore(store);

export {
    persistor,
    store
}
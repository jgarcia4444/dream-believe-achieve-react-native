
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './routes/MainStack';

import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import {store, persistor} from './redux/store';

export default function App() {
  return (
      <NavigationContainer>
        <StatusBar barStyle='light-content' networkActivityIndicatorVisible={false} />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <MainStack />
          </PersistGate>
        </Provider>
      </NavigationContainer>
  );
}


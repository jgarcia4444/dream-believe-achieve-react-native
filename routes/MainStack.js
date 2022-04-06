import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';

const MainStack = () => {

    const Stack = createNativeStackNavigator();

    const transparentHeader = {
        headerShown: false
    }

    return (
        <Stack.Navigator initialRouteName='Landing'>
            <Stack.Screen options={transparentHeader} name="Landing" component={LandingScreen} />
            <Stack.Screen options={transparentHeader} name="Login" component={LoginScreen} />
        </Stack.Navigator>
    )

}

export default MainStack;
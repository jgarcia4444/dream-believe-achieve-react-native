import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

const MainStack = () => {

    const Stack = createNativeStackNavigator();

    const transparentHeader = {
        headerShown: false
    }

    return (
        <Stack.Navigator initialRouteName='Landing'>
            <Stack.Screen options={transparentHeader} name="Landing" component={LandingScreen} />
            <Stack.Screen options={transparentHeader} name="Login" component={LoginScreen} />
            <Stack.Screen options={transparentHeader} name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
    )

}

export default MainStack;
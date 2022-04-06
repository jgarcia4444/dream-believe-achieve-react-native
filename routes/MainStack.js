import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '../screens/LandingScreen';

const MainStack = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName='Landing'>
            <Stack.Screen name="Landing" component={LandingScreen} />
        </Stack.Navigator>
    )

}

export default MainStack;
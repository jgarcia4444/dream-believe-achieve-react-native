import React from 'react';
import { View, StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../../screens/HomeScreen';

const FooterMenu = () => {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator screenOptions={({route}) => ({
            tabBarIcon: ({ focused, color, size }) => {
                var iconName, iconSize;

                if (route.name === "Home") {
                    iconName = "home"
                } else if (route.name === "Favorites") {
                    iconName = "star"
                } else if (route.name === "Profile") {
                    iconName = "user"
                }
            }
        })}>
            <Tab.Screen name="Home" component={HomeScreen} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({

});

export default FooterMenu;
import React, {useEffect} from 'react';
import { View, StyleSheet } from 'react-native';

import { connect } from 'react-redux';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

import { Feather } from 'react-native-vector-icons';

import HomeScreen from '../../screens/HomeScreen';
import FavoritesScreen from '../../screens/FavoritesScreen';

import Colors from '../../config/Colors';
const {white, black} = Colors;

const FooterMenu = ({username}) => {

    const Tab = createBottomTabNavigator();
    const navigation = useNavigation();

    const transparentHeader = {
        headerShown: false
    }

    useEffect(() => {
        if (username === "") {
            navigation.navigate("Landing");
        } 
    }, [username])

    return (
        <Tab.Navigator initialRouteName='Home' screenOptions={({route}) => ({
            tabBarIcon: ({ focused, color, size }) => {
                var iconName, iconSize, iconColor;

                if (route.name === "Home") {
                    iconName = "home";
                } else if (route.name === "Favorites") {
                    iconName = "star";
                } else if (route.name === "Profile") {
                    iconName = "user";
                }
                console.log(iconName);
                iconSize = focused ? 28 : 20;
                iconColor = focused ? white : black
                return <Feather name={iconName} size={iconSize} color={iconColor} />
            },
            tabBarActiveBackgroundColor: 'black',
            tabBarActiveTintColor: 'white',
            tabBarInactiveBackgroundColor: 'white',
            tabBarInactiveTintColor: 'black',
        })}>
            <Tab.Screen name="Home" component={HomeScreen} options={transparentHeader} />
            <Tab.Screen name="Favorites" component={FavoritesScreen} options={transparentHeader} />
            <Tab.Screen name="Profile" component={HomeScreen} options={transparentHeader} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({

});

const mapStateToProps = state => {
    return {
        username: state.session.userInfo.username
    }
}

export default connect(
    mapStateToProps,
    null
)(FooterMenu);
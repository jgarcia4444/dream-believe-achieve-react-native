import React, {useEffect} from 'react';
import { connect } from 'react-redux';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';

import FooterMenu from '../components/FooterMenu';

import { useNavigation } from '@react-navigation/native';

const MainStack = ({username}) => {

    const navigation = useNavigation();

    const Stack = createNativeStackNavigator();

    const transparentHeader = {
        headerShown: false
    }

    useEffect(() => {
        if (username === "") {
            navigation.navigate("Landing");
        }
    }, [username])

    return (
        <Stack.Navigator initialRouteName='Landing'>
            <Stack.Screen options={transparentHeader} name="Landing" component={LandingScreen} />
            <Stack.Screen options={transparentHeader} name="Login" component={LoginScreen} />
            <Stack.Screen options={transparentHeader} name="SignUp" component={SignUpScreen} />
            <Stack.Screen options={transparentHeader} name="HomeStack" component={FooterMenu} />
        </Stack.Navigator>
    )

}

const mapStateToProps = state => {
    return {
        username: state.session.userInfo.username
    }
}

export default connect(
    mapStateToProps,
    null
)(MainStack);
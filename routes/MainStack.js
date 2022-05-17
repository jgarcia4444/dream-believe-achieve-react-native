import React, {useEffect} from 'react';
import { connect } from 'react-redux';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import SuccessScreen from '../screens/TransitionScreens/SuccessScreen';
import GuestScreen from '../screens/GuestScreen';
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';

import FooterMenu from '../components/FooterMenu';

import { useNavigation } from '@react-navigation/native';

import Colors from '../config/Colors';
const { white, } = Colors;

const MainStack = ({username}) => {

    const navigation = useNavigation();

    const Stack = createNativeStackNavigator();

    const transparentHeader = {
        headerShown: false
    }

    const largeTitleHeader = {
        headerTransparent: true,
        headerTintColor: white,
        headerBackTitle: "",
        headerTitleStyle: {
            fontSize: 24,
            fontWeight: '300'
        }
    }

    useEffect(() => {
        if (username === "") {
            navigation.navigate("Landing");
        } else {
            navigation.navigate("SuccessScreen");
        }
    }, [username])

    return (
        <Stack.Navigator initialRouteName='Landing'>
            <Stack.Screen options={transparentHeader} name="Landing" component={LandingScreen} />
            <Stack.Screen options={transparentHeader} name="Login" component={LoginScreen} />
            <Stack.Screen options={transparentHeader} name="SignUp" component={SignUpScreen} />
            <Stack.Screen options={transparentHeader} name="HomeStack" component={FooterMenu} />
            <Stack.Screen options={transparentHeader} name="SuccessScreen" component={SuccessScreen} />
            <Stack.Screen options={transparentHeader} name="GuestScreen" component={GuestScreen} />
            <Stack.Screen options={largeTitleHeader} name="ForgotPassword" component={ForgotPassword} />
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
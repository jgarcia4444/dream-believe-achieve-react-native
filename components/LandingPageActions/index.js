import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Colors from '../../config/Colors';
const {black, white, blackOpaque, whiteOpaque} = Colors;

const {height, width} = Dimensions.get('screen');

const LandingPageActions = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.landingPageActionsContainer}>
            <View style={[styles.buttonContainer]}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={[styles.actionButton, styles.loginButton]}>
                    <Text style={[styles.buttonText, {color: white}]}>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.buttonContainer]}>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={[styles.actionButton, styles.signUpButton]}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.buttonContainer]}>
                <TouchableOpacity onPress={() => navigation.navigate('GuestScreen')} style={[styles.actionButton, styles.guestScreenButton]}>
                    <Text style={styles.buttonText}>Top Quotes</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    actionButton: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0,
        borderColor: black,
        borderRadius: width / 2,
        paddingVertical: height * 0.02,
    },
    buttonContainer: {
        width: '75%',
        // height: height * 0.05,
        
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 24
    },
    guestScreenButton: {

    },
    landingPageActionsContainer: {
        height: '50%',
        width: '100%',
        padding: width * 0.02,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    loginButton: {
        backgroundColor: blackOpaque,
        
    },
    signUpButton: {
        backgroundColor: whiteOpaque
    }
});

export default LandingPageActions;
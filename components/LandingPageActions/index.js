import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

import Colors from '../../config/Colors';
const {} = Colors;

const {height, width} = Dimensions.get('screen');

const LandingPageActions = () => {

    return (
        <View style={styles.landingPageActionsContainer}>
            <View style={[styles.buttonContainer, styles.loginButtonContainer]}>
                <TouchableOpacity style={styles.actionButton}>
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.buttonContainer, styles.signUpButtonContainer]}>
                <TouchableOpacity style={styles.actionButton}>
                    <Text>Sign Up</Text>
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
    },
    buttonContainer: {
        width: '80%',
        height: height * 0.1,
    },
    landingPageActionsContainer: {
        height: '66%',
        width: '100%',
        padding: width * 0.02,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginButtonContainer: {
        
    },
    signUpButtonContainer: {
        
    }
});

export default LandingPageActions;
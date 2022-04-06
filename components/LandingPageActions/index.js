import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Colors from '../../config/Colors';
const {black, white} = Colors;

const {height, width} = Dimensions.get('screen');

const LandingPageActions = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.landingPageActionsContainer}>
            <View style={[styles.buttonContainer, styles.loginButtonContainer]}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.actionButton}>
                    <Text style={[styles.buttonText, {color: white}]}>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.buttonContainer, styles.signUpButtonContainer]}>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    actionButton: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: black,
        borderRadius: 5,
    },
    buttonContainer: {
        width: '60%',
        height: height * 0.05,
        
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 24
    },
    landingPageActionsContainer: {
        height: '50%',
        width: '100%',
        padding: width * 0.02,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    loginButtonContainer: {
        backgroundColor: black,
        borderRadius: 5,
    },
    signUpButtonContainer: {
        
    }
});

export default LandingPageActions;
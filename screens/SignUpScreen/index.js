import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import GlobalStyles from '../../config/GlobalStyles';
const { container } = GlobalStyles;

const SignUpScreen = () => {

    return (
        <View style={[container, ]}>
            <View style={styles.signUpTopContainer}>
                <Text>Sign Up</Text>
            </View>
            <View style={styles.signUpLoginContainer}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    signUpLoginContainer: {
        height: '20%',
    },
    signUpTopContainer: {
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default SignUpScreen;
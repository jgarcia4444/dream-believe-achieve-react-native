import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import GlobalStyles from '../../config/GlobalStyles';
const { container } = GlobalStyles;

import Colors from '../../config/Colors';
const {darkGray} = Colors;

const LandingScreen = () => {

    return (
        <View style={container}>
            <View style={styles.appNameContainer}>
                <Text style={styles.appNameAbbreviated}>DBA</Text>
                <Text style={styles.appNameFull}>Dream Believe Achieve</Text>
            </View>
            <View style={styles.landingPageActionsContainer}>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    appNameContainer: {
        height: '33%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    appNameAbbreviated: {
        fontSize: 48,
        fontWeight: 'bold'
    },
    appNameFull: {
        fontFamily: 'serif',
        color: darkGray
    },
    landingPageActionsContainer: {
        height: '66%',
        width: '100%',
    }
});

export default LandingScreen;
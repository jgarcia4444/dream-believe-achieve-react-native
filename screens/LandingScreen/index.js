import React, {useRef, useEffect} from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

import GlobalStyles from '../../config/GlobalStyles';
const { container } = GlobalStyles;

import Colors from '../../config/Colors';
const {darkGray} = Colors;

import LandingPageActions from '../../components/LandingPageActions';

const LandingScreen = () => {

    const viewOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        fadeInView();
    });

    const fadeInView = () => {
        Animated.timing(viewOpacity, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
        }).start();
    }

    return (
        <Animated.View style={[container, {opacity: 0}, {opacity: viewOpacity}]}>
            <View style={styles.appNameContainer}>
                <Text style={styles.appNameAbbreviated}>DBA</Text>
                <Text style={styles.appNameFull}>Dream Believe Achieve</Text>
            </View>
            <LandingPageActions />
        </Animated.View>
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
        color: darkGray
    },
    
});

export default LandingScreen;
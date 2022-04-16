import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../../config/Colors';
const {backgroundGradientTopLeft, backgroundGradientTopRight} = Colors;

const Background = () => {

    return (
        <>
            <LinearGradient end={{x: 0.95, y: 1.0}} start={{x: 0.05, y: 0}} style={styles.background} locations={[0.30, 0.60, 0.9]} colors={backgroundGradientTopLeft} />
            <LinearGradient start={{x: 0.95, y: 0}} end={{x: 0.05, y: 1.0}} style={[styles.background, styles.backgroundTop]} locations={[0.30, 0.5, 0.9]} colors={backgroundGradientTopRight} />
        </>
    )
};

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
    background: {
        height: height,
        width: width,
        position: 'absolute'
    },
    backgroundTop: {
        opacity: 0.55
    },
});

export default Background;


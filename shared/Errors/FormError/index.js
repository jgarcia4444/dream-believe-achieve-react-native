import React, {useRef, useEffect} from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

import Colors from '../../../config/Colors';
const {white, black, darkGray, red} = Colors;

const FormError = ({error}) => {

    const opacityVal = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        fadeViewIn()
    });

    const fadeViewIn = () => {
        Animated.timing(opacityVal, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true
        }).start();
    }

    return (
        <Animated.View style={[styles.errorRow, {opacity: opacityVal}]}>
            <Text style={styles.errorText}>{error}</Text>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    errorRow: {
        opacity: 0,
        width: '100%'
    },
    errorText: {
        color: red
    }
});

export default FormError;
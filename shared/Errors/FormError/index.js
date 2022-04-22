import React, {useRef, useEffect} from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

import Colors from '../../../config/Colors';
const {white, black, darkGray, red, whiteOpaque} = Colors;

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
            <View style={styles.errorBackground}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        </Animated.View>
    )
}

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
    errorBackground: {
        backgroundColor: white,
        padding: width * 0.01,
        borderRadius: width / 2,
    },
    errorRow: {
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    errorText: {
        color: red,
        fontWeight: 'bold'
    }
});

export default FormError;
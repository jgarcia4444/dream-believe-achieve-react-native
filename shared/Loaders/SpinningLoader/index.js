import React, { useRef, } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const SpinningLoader = () => {

    return (
        <View style={styles.loaderContainer}>
            <View style={styles.loader}></View>
            <Text>Loading</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    loader: {

    },
    loaderContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default SpinningLoader;
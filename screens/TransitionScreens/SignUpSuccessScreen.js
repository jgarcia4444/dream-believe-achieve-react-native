import React, {useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';

import GlobalStyles from '../../config/GlobalStyles';
const {container} = GlobalStyles;

import Colors from '../../config/Colors';
const {white} = Colors;

import Background from '../../components/Background';

const SignUpSuccessScreen = () => {

    return (
        <Animated.View style={[container]}>
            <Background />
        </Animated.View>
    )
}

const styles = StyleSheet.create({

});

export default SignUpSuccessScreen;
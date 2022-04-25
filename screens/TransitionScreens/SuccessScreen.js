import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
const {height, width} = Dimensions.get('screen');
import { useNavigation } from '@react-navigation/native';
import { Feather } from 'react-native-vector-icons';

import GlobalStyles from '../../config/GlobalStyles';
const {container} = GlobalStyles;

import Colors from '../../config/Colors';
const {white} = Colors;

import Background from '../../components/Background';

const SuccessScreen = ({successFrom}) => {

    const navigation = useNavigation();
    const opacityVal = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        fadeViewIn()
    })

    const configureText = successFrom === "SIGN_UP" ? "Account Created!" : "Success!";

    const fadeViewIn = () => {
        Animated.timing(opacityVal, {
            toValue: 1,
            duration: 750,
            useNativeDriver: true
        }).start(() => {
            setTimeout(navigateToSuccess, 2000);
        })
    }

    const navigateToSuccess = () => {
        navigation.navigate('HomeStack');
    }

    return (
        <Animated.View style={[container]}>
            <Background />
            <View style={styles.messageContainer}>
                <Feather name="check-circle" size={48} color={white} />
                <Text style={styles.messageText}>{configureText}</Text>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    messageContainer: {
        height: height * 0.5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    messageText: {
        color: white,
        fontSize: 28,
        marginTop: height * 0.02,
        fontWeight: 'bold',
    },
});

export default SuccessScreen;
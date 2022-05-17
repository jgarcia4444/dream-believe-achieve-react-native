import React, {useState, useRef, useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements'


import GlobalStyles from '../../config/GlobalStyles';
const { container } = GlobalStyles;

import Colors from '../../config/Colors';
const { white, black, whiteOpaque, blackOpaque, blue } = Colors;

import Background from '../../components/Background';
import FormInput from '../../shared/FormInput';

const ForgotPassword = () => {

    const headerHeight = useHeaderHeight();

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const inputObject = {
        inputValue: email,
        changeFunc: (e) => setEmail(e),
        label: "Email",
        inputError: emailError
    }

    return (
        <View style={[container, styles.forgotPasswordContainer, {paddingTop: headerHeight + height * 0.05}]}>
            <Background />
            <Text style={styles.descriptionText}>Enter the email address associated with your account.</Text>
            <FormInput inputObject={inputObject} />
            <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.sendCodeText}>Send Code</Text>
            </TouchableOpacity>
        </View>
    )
}

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    actionButton: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0,
        borderColor: black,
        borderRadius: width / 2,
        paddingVertical: height * 0.02,
        backgroundColor: blackOpaque,
    },
    descriptionText: {
        fontSize: 16,
    },
    forgotPasswordContainer: {
        justifyContent: 'flex-start',
    },
    sendCodeText: {
        fontSize: 24,
        color: white,
    },
});

export default ForgotPassword;
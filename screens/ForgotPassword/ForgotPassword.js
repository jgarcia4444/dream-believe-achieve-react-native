import React, {useState, useRef, useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';

import GlobalStyles from '../../config/GlobalStyles';
const { container } = GlobalStyles;

import Colors from '../../config/Colors';
const { white, black, whiteOpaque, blackOpaque, blue } = Colors;

import Background from '../../components/Background';
import FormInput from '../../shared/FormInput';

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const inputObject = {
        inputValue: email,
        changeFunc: (e) => setEmail(e),
        label: "Email",
        inputError: emailError
    }

    return (
        <View style={[container, styles.forgotPasswordContainer]}>
            <Background />
            <FormInput inputObject={inputObject} />
        </View>
    )
}

const styles = StyleSheet.create({
    forgotPasswordContainer: {

    }
});

export default ForgotPassword;
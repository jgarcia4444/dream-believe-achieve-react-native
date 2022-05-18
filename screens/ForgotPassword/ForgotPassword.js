import React, {useState, useRef, useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated, ActivityIndicator } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements'
import { connect, useDispatch } from 'react-redux';


import GlobalStyles from '../../config/GlobalStyles';
const { container } = GlobalStyles;

import Colors from '../../config/Colors';
const { white, black, whiteOpaque, blackOpaque, blue } = Colors;

import Background from '../../components/Background';
import FormInput from '../../shared/FormInput';

import sendCode from '../../redux/actions/userActions/sendCode';

const ForgotPassword = ({ sendCode, forgotPassword }) => {

    const {codeError, sendingCode, email} = forgotPassword;

    const dispatch = useDispatch()

    const headerHeight = useHeaderHeight();

    const [inputEmail, setInputEmail] = useState("");

    const inputValues = {
        inputValue: inputEmail,
        changeFunc: (e) => setInputEmail(e),
        label: "Email",
        inputError: codeError
    }

    const handleSendCodePress = () => {
        if (inputEmail === "") {
            dispatch({type: "CODE_SEND_ERROR", errorMessage: "Email needs a value to send the code to."});
        } else {
            sendCode(inputEmail)
        }
    }

    return (
        <View style={[container, styles.forgotPasswordContainer, {paddingTop: headerHeight + height * 0.05}]}>
            <Background />
            <Text style={styles.descriptionText}>Enter the email address associated with your account.</Text>
            <FormInput inputObject={inputValues} />
            <TouchableOpacity onPress={handleSendCodePress} style={styles.actionButton}>
                <Text style={styles.sendCodeText}>{sendingCode ? <ActivityIndicator size="large" color={white} /> : "Send Code"}</Text>
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

const mapStateToProps = state => {
    return {
        forgotPassword: state.forgotPassword
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendCode: (email) => dispatch(sendCode(email)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgotPassword);
import React, {useState, } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import GlobalStyles from '../../config/GlobalStyles';
const { container } = GlobalStyles;

import Colors from '../../config/Colors';
const { black, } = Colors;

import FormInput from '../../shared/FormInput';

const LoginScreen = () => {

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const handleLoginInputChange = (newVal, label) => {
        if (label === 'email') {
            setLoginEmail(newVal);
        } else if (label === 'password') {
            setLoginPassword(newVal);
        }
    }

    const loginInputObjects = [
        {
            label: 'Email',
            inputValue: loginEmail,
            changeFunc: (newVal) => handleLoginInputChange(newVal, 'email')
        },
        {
            label: 'Password',
            inputValue: loginPassword,
            changeFunc: (newVal) => handleLoginInputChange(newVal, 'password')
        }
    ]

    const renderInputs = () => {
        return loginInputObjects.map((inputInfo, i) => {
            let {label} = inputInfo;
            let computedKey = `${i}-${label}-login`;
            return <FormInput key={computedKey} inputObject={inputInfo} />
        })
    }

    return (
        <View style={[container]}>
            <View style={styles.loginTitleRow}>
                <Text style={styles.loginTitle}>Login</Text>
            </View>    
            <View style={styles.loginContainer}>
                <View style={styles.loginFormContainer}>
                    {renderInputs()}
                </View>
            </View>
        </View>
    )
}

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
    loginContainer: {
        // borderWidth: 2,
        // borderColor: black,
        // borderRadius: 5,
        paddingVertical: height * 0.01,
    },
    loginTitle: {
        fontSize: 48,
        fontWeight: 'bold'
    },
    loginTitleRow: {
        width: '100%',
        alignItems: 'flex-start',
    }
})

export default LoginScreen;
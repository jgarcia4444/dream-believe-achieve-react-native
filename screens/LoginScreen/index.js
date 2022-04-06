import React, {useState, } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import GlobalStyles from '../../config/GlobalStyles';
import FormInput from '../../shared/FormInput';
const { container } = GlobalStyles;

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

            <View style={styles.loginContainer}>
                <View style={styles.loginTitleRow}>
                    <Text>Login</Text>
                </View>    
                <View style={styles.loginFormContainer}>
                    {renderInputs()}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default LoginScreen;
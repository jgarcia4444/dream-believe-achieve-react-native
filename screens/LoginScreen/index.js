import React, {useState, } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import GlobalStyles from '../../config/GlobalStyles';
const { container } = GlobalStyles;

import Colors from '../../config/Colors';
const { black, white, blue } = Colors;

import FormInput from '../../shared/FormInput';

const LoginScreen = () => {

    const navigation = useNavigation();

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
            <View style={styles.loginTopContainer}>
                <View style={styles.loginTitleRow}>
                    <Text style={styles.loginTitle}>Login</Text>
                </View>    
                <View style={styles.loginContainer}>
                    <View style={styles.loginFormContainer}>
                        {renderInputs()}
                    </View>
                </View>
                <View style={styles.loginButtonContainer}>
                    <TouchableOpacity style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.loginSignUpRow}>
                <Text>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.loginSignUpText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
    loginButton: {
        backgroundColor: black,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginButtonContainer: {
        width: '100%',
        height: height * 0.1,
    },
    loginButtonText: {
        color: white,
        fontSize: 24,
        fontWeight: 'bold',
    },
    loginContainer: {
        paddingVertical: height * 0.01,
    },
    loginTopContainer: {
        width: '100%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginTitle: {
        fontSize: 48,
        fontWeight: 'bold'
    },
    loginTitleRow: {
        width: '100%',
        alignItems: 'flex-start',
    },
    loginSignUpRow: {
        flexDirection: 'row'
    },
    loginSignUpText: {
        color: blue
    },
})

export default LoginScreen;
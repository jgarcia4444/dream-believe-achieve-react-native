import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import GlobalStyles from '../../config/GlobalStyles';
const { container } = GlobalStyles;

import Colors from '../../config/Colors';
const { blue, black, white, } = Colors;

import FormInput from '../../shared/FormInput';

const SignUpScreen = () => {

    const navigation = useNavigation();

    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpUsername, setSignUpUsername] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');

    const signUpInputObjects = [
        {
            label: 'Email',
            inputValue: signUpEmail,
            changeFunc: (newVal) => handleSignUpInputChange(newVal, 'email')
        },
        {
            label: 'Username',
            inputValue: signUpUsername,
            changeFunc: (newVal) => handleSignUpInputChange(newVal, 'username')
        },
        {
            label: 'Password',
            inputValue: signUpPassword,
            changeFunc: (newVal) => handleSignUpInputChange(newVal, 'password')
        },
    ];

    const renderInputs = () => {
        return signUpInputObjects.map((inputInfo, i) => {
            let {label} = inputInfo;
            let computedKey = `${i}-${label}-login`;
            return <FormInput key={computedKey} inputObject={inputInfo} />
        })
    }

    const handleSignUpInputChange = (newVal, label) => {
        switch(label) {
            case 'email':
                setSignUpEmail(newVal);
                break;
            case 'username':
                setSignUpUsername(newVal);
                break;
            case 'password':
                setSignUpPassword(newVal);
                break;
            default:
                break;
        };
    }

    return (
        <View style={[container, ]}>
            <View style={styles.signUpTopContainer}>
                <View style={styles.signUpTitleRow}>
                    <Text style={styles.signUpTitle}>Sign Up</Text>
                </View>    
                <View style={styles.signUpInputContainer}>
                    {renderInputs()}
                </View>
                <View style={styles.signUpButtonContainer}>
                    <TouchableOpacity style={styles.signUpButton}>
                        <Text style={styles.signUpButtonText}>Create</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.signUpLoginContainer}>
            <Text>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.signUpLoginText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
    signUpButton: {
        backgroundColor: black,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signUpButtonContainer: {
        width: '100%',
        height: height * 0.1,
    },
    signUpButtonText: {
        color: white,
        fontSize: 24,
        fontWeight: 'bold',
    },
    signUpLoginContainer: {
        height: '20%',
        flexDirection: 'row',
    },
    signUpLoginText: {
        color: blue
    },
    signUpInputContainer: {
        paddingVertical: height * 0.01,
    },
    signUpTopContainer: {
        width: '100%',
        height: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signUpTitle: {
        fontSize: 48,
        fontWeight: 'bold',
    },
    signUpTitleRow: {
        width: '100%',
        alignItems: 'flex-start',
    },
});

export default SignUpScreen;
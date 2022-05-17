import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';

import GlobalStyles from '../../config/GlobalStyles';
const { container } = GlobalStyles;

import Colors from '../../config/Colors';
const { black, white, blue, blackOpaque } = Colors;

import FormInput from '../../shared/FormInput';
import FormError from '../../shared/Errors/FormError';
import loginUser from '../../redux/actions/sessionActions/loginUser';
import Background from '../../components/Background';

const LoginScreen = ({loginUser, session}) => {

    const {userInfo, loginError, userInfoLoading, formErrors} = session;

    const {username} = userInfo;

    const dispatch = useDispatch();

    const navigation = useNavigation();

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

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
            changeFunc: (newVal) => handleLoginInputChange(newVal, 'email'),
            inputError: emailError
        },
        {
            label: 'Password',
            inputValue: loginPassword,
            changeFunc: (newVal) => handleLoginInputChange(newVal, 'password'),
            inputError: passwordError
        }
    ]

    const renderInputs = () => {
        return loginInputObjects.map((inputInfo, i) => {
            let {label} = inputInfo;
            let computedKey = `${i}-${label}-login`;
            return <FormInput key={computedKey} inputObject={inputInfo} />
        })
    }

    const handleLoginPress = () => {
        if (loginEmail === "") {
            return dispatch({type: "USER_LOGIN_ERROR", errorMessage: "Email cannot be left empty."});
        } else if (loginPassword === "") {
            return dispatch({type: "USER_LOGIN_ERROR", errorMessage: "Password cannot be left empty."});
        }
        let loginInfo = {
            email: loginEmail,
            password: loginPassword
        }
        loginUser(loginInfo);
    }

    const checkForErrors = () => {
        if (formErrors.length > 0) {
            formErrors.forEach(error => {
                let errorKey = Object.keys(error)[0];
                let errorMessage = error[errorKey]
                switch(errorKey) {
                    case 'email':
                        setEmailError(errorMessage);
                        break;
                    case 'password':
                        setPasswordError(errorMessage);
                        break;
                    default:
                        return;
                }
            })
        }
    }

    useEffect(() => {
        checkForErrors();
        if (username !== "") {
            navigation.navigate('HomeStack');
        }
    },[username, formErrors.length])

    const displayActionButtonText = () => {
        return userInfoLoading === true ? <ActivityIndicator color={white} size='large' /> : "Login"
    }

    return (
        <View style={[container, styles.loginScreenContainer]}>
            <Background />
            <View style={styles.loginTopContainer}>
                <View style={styles.loginTitleRow}>
                    <Text style={styles.loginTitle}>Login</Text>
                </View>
                {loginError !== "" &&
                    <FormError error={loginError} />    
                }
                <View style={styles.loginContainer}>
                    {renderInputs()}
                </View>
                <View style={styles.forgotPasswordRow}>
                    <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                        <Text style={styles.forgotPasswordText}>Forgot Password</Text>
                    </TouchableOpacity>
                </View>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'margin'} style={styles.loginButtonContainer}>
                    <TouchableOpacity onPress={handleLoginPress} style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>{displayActionButtonText()}</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
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
    forgotPasswordRow: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: height * 0.03,
    },
    forgotPasswordText: {
        color: blue,
    },
    loginButton: {
        backgroundColor: blackOpaque,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: width / 2,
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
        paddingTop: height * 0.01,
        width: '100%',
    },
    loginTopContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: height * 0.10
    },
    loginTitle: {
        fontSize: 48,
        fontWeight: 'bold'
    },
    loginTitleRow: {
        width: '100%',
        alignItems: 'flex-start',
    },
    loginScreenContainer: {
        justifyContent: 'flex-start'
    },
    loginSignUpRow: {
        flexDirection: 'row',
        marginTop: height * 0.1,
    },
    loginSignUpText: {
        color: blue
    },
});

const mapStateToProps = state => {
    return {
        session: state.session,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loginUser: (loginInfo) => dispatch(loginUser(loginInfo)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginScreen);
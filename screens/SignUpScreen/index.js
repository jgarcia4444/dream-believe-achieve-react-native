import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';


import GlobalStyles from '../../config/GlobalStyles';
const { container } = GlobalStyles;
import Colors from '../../config/Colors';
const { blue, black, white, blackOpaque } = Colors;
import FormInput from '../../shared/FormInput';
import createUser from '../../redux/actions/userActions/createUser';
import FormError from '../../shared/Errors/FormError';
import Background from '../../components/Background';

const SignUpScreen = ({createUser, session}) => {

    const {userInfo, signUpError, userInfoLoading, formErrors} = session

    const {username} = userInfo;

    const dispatch = useDispatch();

    const navigation = useNavigation();

    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpUsername, setSignUpUsername] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const signUpInputObjects = [
        {
            label: 'Email',
            inputValue: signUpEmail,
            changeFunc: (newVal) => handleSignUpInputChange(newVal, 'email'),
            inputError: emailError,
        },
        {
            label: 'Username',
            inputValue: signUpUsername,
            changeFunc: (newVal) => handleSignUpInputChange(newVal, 'username'),
            inputError: usernameError,
        },
        {
            label: 'Password',
            inputValue: signUpPassword,
            changeFunc: (newVal) => handleSignUpInputChange(newVal, 'password'),
            inputError: passwordError,
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

    const handleCreatePress = () => {
        if (signUpEmail === "") {
            return dispatch({type: "USER_CREATION_ERROR", errorMessage: "Email cannot be left blank."});
        } else if (signUpUsername === "") {
            return dispatch({type: "USER_CREATION_ERROR", errorMessage: "Username cannot be left blank."});
        } else if (signUpPassword === "") {
            return dispatch({type: "USER_CREATION_ERROR", errorMessage: "Password cannot be left blank."});
        }
        let userInfo = {
            username: signUpUsername,
            password: signUpPassword,
            email: signUpEmail
        };
        createUser(userInfo);
    }

    const checkForErrors = () => {
        let errorKeys = Object.keys(formErrors);
        if (errorKeys.length > 0) {
            errorKeys.forEach(errorKey => {
                let errorMessage = formErrors[errorKey][0];
                switch(errorKey) {
                    case 'email':
                        setEmailError(errorMessage);
                        break;
                    case 'username':
                        setUsernameError(errorMessage);
                        break;
                    case 'password':
                        setPasswordError(errorMessage);
                        break;
                    default:
                        break;
                }
            })
        }
        if (!errorKeys.includes('email')) {
            setEmailError('');
        }
        if (!errorKeys.includes('password')) {
            setPasswordError('')
        }
        if (!errorKeys.includes('username')) {
            setUsernameError('')
        }
    }

    useEffect(() => {
        checkForErrors();
        if (username !== "") {
            navigation.navigate('HomeStack');
        }
    },[username, formErrors.length])

    const displayActionButtonText = () => {
        return userInfoLoading === true ? <ActivityIndicator color={white} size='large' /> : "Create"
    }

    return (
        <ScrollView contentContainerStyle={[container]}>
            <Background />
            <View style={styles.signUpTopContainer}>
                <View style={styles.signUpTitleRow}>
                    <Text style={styles.signUpTitle}>Sign Up</Text>
                </View>    
                {signUpError !== "" &&
                    <FormError error={signUpError} />
                }
                <View style={styles.signUpInputContainer}>
                    {renderInputs()}
                </View>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'margin'} style={styles.signUpButtonContainer}>
                    <TouchableOpacity onPress={handleCreatePress} style={styles.signUpButton}>
                        <Text style={styles.signUpButtonText}>{displayActionButtonText()}</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
            <View style={styles.signUpLoginContainer}>
            <Text>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.signUpLoginText}>Login</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
    signUpButton: {
        backgroundColor: blackOpaque,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: width / 2,
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
        width: '100%',
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

const mapStateToProps = state => {
    return {
        session: state.session
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createUser: (userInfo) => dispatch(createUser(userInfo)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpScreen);
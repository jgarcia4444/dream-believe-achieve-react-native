import React, { useState, useRef, useEffect} from 'react';
import { View, StyleSheet, TextInput, Dimensions, Text, KeyboardAvoidingView, Platform, Animated } from 'react-native';

import { Feather } from 'react-native-vector-icons';

const {height, width} = Dimensions.get('screen');

import Colors from '../../config/Colors';
import FormError from '../Errors/FormError';
const {darkGray, white, lightGray, whiteOpaque, black, red} = Colors;

const FormInput = ({inputObject}) => {

    const {inputValue, changeFunc, label, inputError} = inputObject;

    const [inputBackgroundColor, setInputBackgroundColor] = useState(whiteOpaque);
    const [borderWidth, setBorderWidth] = useState(0);

    const computedIcon = () => {
        var iconName
        switch(label) {
            case 'Email':
                iconName = "mail";
                break;
            case 'New Password':
                iconName = "lock"
                break;
            case 'Password':
                iconName = "lock";
                break;
            case 'Username':
                iconName = 'user';
                break;
            default:
                iconName = "user";
                break;
        }
        return <Feather name={iconName} size={24} color={black} />
    }

    const androidAutoComplete = () => {
        if (label === "Password") {
            return 'password';
        } else if (label === "Email") {
            return 'email';
        } else if (label === "Username") {
            return 'username';
        }
    }

    const computedKeyboardType = () => {
        if (label === "Email") {
            return 'email-address';
        } else {
            return 'default';
        }
    }

    const fadeBorder = (fadeIn) => {
        var toValue;
        if (fadeIn === true) {
            toValue = 2;
        } else {
            toValue = 0;
        }
        setBorderWidth(toValue)
    }

    useEffect(() => {
        if (inputError === "") {
            fadeBorder(false);
        } else {
            fadeBorder(true);
        }
    }, [inputError])

    return (
        <KeyboardAvoidingView style={styles.formInputContainer} behavior={Platform.OS === 'ios' ? "padding" : "margin"}>    
            <View style={styles.formInputLabelRow}>
                <Text style={styles.formInputLabel}>{label}</Text>
                {inputError !== '' &&
                    <FormError error={inputError} />
                }
            </View>
            
            <Animated.View style={[styles.formInput, {backgroundColor: inputBackgroundColor}, {borderWidth: borderWidth, borderColor: red}]}>
                    <View style={styles.inputIconContainer}>
                        {computedIcon()}
                    </View>
                    <TextInput onBlur={() => setInputBackgroundColor(whiteOpaque)} onFocus={() => setInputBackgroundColor(white)} secureTextEntry={label === "Password" ? true : false} placeholder={label} keyboardType={computedKeyboardType()} importantForAutofill='yes' clearButtonMode='while-editing' autoComplete={androidAutoComplete()} value={inputValue} onChangeText={changeFunc} style={[styles.input]} />
            </Animated.View>
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    formInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: height * 0.075,
        borderRadius: width / 2,
        backgroundColor: whiteOpaque,
        paddingHorizontal: width * 0.02,
    },
    formInputContainer: {
        width: '100%',
        marginBottom: height * 0.02,
    },
    formInputLabel: {
        fontWeight: 'bold',
        fontSize: 24,
        color: black,
        marginEnd: width * 0.02,
    },
    formInputLabelRow: {
        width: '100%',
        flexDirection: 'row',
    },
    input: {
        width: '90%',
        height: '100%',
        // backgroundColor: whiteOpaque,
        borderRadius: width / 2,
    },
    inputIconContainer: {
        width: '10%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: whiteOpaque,
        // borderTopStartRadius: width / 2,
    }
});

export default FormInput;
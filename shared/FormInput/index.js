import React, { useState, } from 'react';
import { View, StyleSheet, TextInput, Dimensions, Text } from 'react-native';

import { Feather } from 'react-native-vector-icons';

const {height, width} = Dimensions.get('screen');

import Colors from '../../config/Colors';
const {darkGray, white, lightGray, whiteOpaque, black} = Colors;

const FormInput = ({inputObject}) => {

    const {inputValue, changeFunc, label} = inputObject;

    const [inputBackgroundColor, setInputBackgroundColor] = useState(whiteOpaque);

    const computedIcon = () => {
        var iconName
        switch(label) {
            case 'Email':
                iconName = "mail";
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

    return (
        <View style={styles.formInputContainer}>
            <View style={styles.formInputLabelRow}>
                <Text style={styles.formInputLabel}>{label}</Text>
            </View>
            <View style={[styles.formInput, {backgroundColor: inputBackgroundColor}]}>
                <View style={styles.inputIconContainer}>
                    {computedIcon()}
                </View>
                <TextInput onBlur={() => setInputBackgroundColor(whiteOpaque)} onFocus={() => setInputBackgroundColor(white)} secureTextEntry={label === "Password" ? true : false} placeholder={label} keyboardType={computedKeyboardType()} importantForAutofill='yes' clearButtonMode='while-editing' autoComplete={androidAutoComplete()} value={inputValue} onChangeText={changeFunc} style={[styles.input]} />
            </View>
        </View>
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
        marginBottom: height * 0.03,
    },
    formInputLabel: {
        fontWeight: 'bold',
        fontSize: 24,
        color: black,
    },
    formInputLabelRow: {
        width: '100%',
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
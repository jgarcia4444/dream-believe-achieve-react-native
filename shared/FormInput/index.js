import React from 'react';
import { View, StyleSheet, TextInput, Dimensions, Text } from 'react-native';

import { Feather } from 'react-native-vector-icons';

const {height, width} = Dimensions.get('screen');

import Colors from '../../config/Colors';
const {darkGray, white, lightGray} = Colors;

const FormInput = ({inputObject}) => {

    const {inputValue, changeFunc, label} = inputObject;

    const computedIcon = () => {
        var iconName
        switch(label) {
            case 'Email':
                iconName = "mail";
                break;
            case 'Password':
                iconName = "lock";
                break;
            default:
                iconName = "user";
                break;
        }
        return <Feather name={iconName} size={24} color={darkGray} />
    }

    return (
        <View style={styles.formInputContainer}>
            <View style={styles.formInputLabelRow}>
                <Text style={styles.formInputLabel}>{label}</Text>
            </View>
            <View style={styles.formInput}>
                <View style={styles.inputIconContainer}>
                    {computedIcon()}
                </View>
                <TextInput value={inputValue} onChangeText={changeFunc} style={styles.input} />
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
    },
    formInputContainer: {
        width: '100%',
        marginBottom: height * 0.03,
    },
    formInputLabel: {
        fontWeight: 'bold',
        fontSize: 24,
        color: darkGray,
    },
    formInputLabelRow: {
        width: '100%',
    },
    input: {
        width: '90%',
        height: '100%',
        backgroundColor: lightGray
    },
    inputIconContainer: {
        width: '10%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: lightGray,
    }
});

export default FormInput;
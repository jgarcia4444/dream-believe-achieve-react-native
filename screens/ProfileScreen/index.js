import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';

import GlobalStyles from '../../config/GlobalStyles';
const { container } = GlobalStyles;

import Colors from '../../config/Colors';
const {white, black, darkGray, blue, blackOpaque} = Colors;

import Background from '../../components/Background';
import FormInput from '../../shared/FormInput';

import sendNewPasswordInfo from '../../redux/actions/userActions/sendNewPasswordInfo';

const ProfileScreen = ({signOut, userInfo, sendNewPasswordInfo, changePassword}) => {

    const dispatch = useDispatch();

    const {username, email} = userInfo;

    const { changingPassword, oldPasswordError, newPasswordError } = changePassword;

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handlePasswordChangePress = () => {
        if (password === "") {
            dispatch({type: "PASSWORD_EMPTY"});
        } else if (newPassword === "") {
            dispatch({type: "NEW_PASSWORD_EMPTY"});
        } else if (password !== "" && newPassword !== "") {
            let newPassInfo = {
                password: password,
                new_password: newPassword,
                email: email
            }
            sendNewPasswordInfo({
                password_info: newPassInfo
            })
        }
    }

    const renderInputs = () => {
        const inputs = [
            {
                inputValue: password,
                changeFunc: (e) => setPassword(e),
                inputError: oldPasswordError,
                label: "Password"
            },
            {
                inputValue: newPassword,
                changeFunc: (e) => setNewPassword(e),
                inputError: newPasswordError,
                label: "New Password"
            }
        ];

        return inputs.map((inputInfo, i) => <FormInput key={i} inputObject={inputInfo} />)

    }

    return (
        <View style={[container, styles.profileScreenContainer]}>
            <Background />
            <View style={styles.profileScrollContainer}>
                <View style={styles.userInfoRow}>
                    <View style={styles.userInfoCol}>
                        <Text style={styles.userInfoLabel}>Username:</Text>
                        <Text style={styles.userInfo}>{username}</Text>
                    </View>
                    <View style={styles.userInfoCol}>
                        <Text style={styles.userInfoLabel}>Email:</Text>
                        <Text style={styles.userInfo}>{email}</Text>
                    </View>
                </View>
                <View style={styles.passwordChangeContainer}>
                    { renderInputs() }
                    <View style={styles.changePasswordButtonContainer}>
                        <TouchableOpacity style={[styles.actionButton, styles.changePasswordButton]} onPress={handlePasswordChangePress}>
                            <Text style={styles.changePasswordText}>Change Password</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.signOutButtonContainer}>
                <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
                    <Text style={styles.signOutText}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
    actionButton: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0,
        borderColor: black,
        borderRadius: width / 2,
        paddingVertical: height * 0.02,
    },
    changePasswordButton: {
        backgroundColor: blackOpaque,
        width: "100%"
    },
    changePasswordButtonContainer: {
        width: '100%',
    },
    changePasswordText: {
        color: white,
        fontSize: 18,
    },
    passwordChangeContainer: {
        width: "90%",
        alignItems: 'center',
        justifyContent: "center"
    },
    profileScrollContainer: {
        width: '100%',
        height: height * 0.75,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileScreenContainer: {
        justifyContent: 'center'
    },
    signOutButton: {
        width: "90%",
        height: height * 0.10,
        borderWidth: 1,
        borderColor: blue,
        borderRadius: (width * 0.90) / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba( 255, 255, 255, 0.10)',
    },
    signOutButtonContainer: {
        height: height * 0.25,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    signOutText: {
        color: blue,
        fontSize: 18,
    },
    userInfo: {
        fontWeight: 'bold'
    },
    userInfoCol: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    userInfoLabel: {
        fontWeight: 'bold',
        color: white,
        fontSize: 20,
    },
    userInfoRow: {
        width: '100%',
        flexDirection: 'row'
    },
});

const mapStateToProps = state => {
    return {
        userInfo: state.session.userInfo,
        changePassword: state.changePassword,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch({type: "USER_SIGN_OUT"}),
        sendNewPasswordInfo: (passwordInfo) => dispatch(sendNewPasswordInfo(passwordInfo)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileScreen);
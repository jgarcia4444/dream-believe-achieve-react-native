import React, { useEffect, } from 'react';
import { View, Modal, Text, StyleSheet, Dimensions } from 'react-native';
import { Feather } from 'react-native-vector-icons';

import Colors from '../../config/Colors';
const { green, white, whiteOpaque} = Colors

import { useDispatch } from 'react-redux';

const SuccessModal = ({show}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(closeModal, 1500);
    })

    const closeModal = () => {
        dispatch({type: "REMOVE_SUCCESS_MODAL"});
    }

    return (
        <Modal 
            animationType='slide'
            transparent={true}
            visible={show}
        >
            <View style={styles.centerView}>
                <View style={styles.successModalContainer}>
                    <Feather size={28} name="check-circle" color={green} />
                    <Text style={styles.passwordChangedText}>Success</Text>
                </View>
            </View>
        </Modal>
    )
}

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
    centerView: {
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center'
    },
    passwordChangedText: {
        color: green,
        fontWeight: 'bold',
        fontSize: 16,
    },
    successModalContainer: {
        width: width * 0.25,
        height: width * 0.25,
        borderRadius: 10,
        backgroundColor: white,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default SuccessModal;
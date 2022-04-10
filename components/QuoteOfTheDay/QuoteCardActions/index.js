import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Feather } from 'react-native-vector-icons';

import Colors from '../../../config/Colors';
const {black, white, darkGray} = Colors;

const QuoteCardActions = () => {

    const starButton = (
        <TouchableOpacity style={[styles.actionButton, styles.starButton]}>
            <Feather name="star" size={24} color={black}/>
        </TouchableOpacity>
    );

    const shareButton = (
        <TouchableOpacity style={[styles.actionButton, styles.shareButton]}>
            <Feather name="share" size={24} color={black}/>
        </TouchableOpacity>
    )

    return (
        <View style={styles.quoteCardActionsRow}>
            {starButton} 
            {shareButton}
        </View>
    )
}

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
    actionButton: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: black,
        borderRadius: '50%',
    },
    shareButton: {
        marginStart: width * 0.05,
    },
    quoteCardActionsRow: {
        width: '100%',
        flexDirection: 'row',
        marginTop: height * 0.02,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
});

export default QuoteCardActions;
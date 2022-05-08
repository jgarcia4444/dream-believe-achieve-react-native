import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform, Share } from 'react-native';
import { Feather } from 'react-native-vector-icons';

import Colors from '../../../config/Colors';
const {black, white, darkGray, redOpaque} = Colors;

const QuoteCardActions = ({handleFavoritePress, isFavorited, handleSharePress, shareToIGStories}) => {

    const deviceShadow = Platform.OS === 'ios' ? {
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.7,
        shadowRadius: 1
    } : {
        elevation: 1
    }

    const isFavoritedStyle = isFavorited && {
        backgroundColor: '#ffd700',
        borderWidth: 0,
        shadowColor: black,
        ...deviceShadow
    }

    const starButton = (
        <TouchableOpacity onPress={handleFavoritePress} style={[styles.actionButton, styles.starButton, isFavoritedStyle]}>
            <Feather name="star" size={24} color={black}/>
        </TouchableOpacity>
    );

    const shareButton =
        <TouchableOpacity onPress={handleSharePress} style={[styles.actionButton, styles.shareButton, {shadowColor: black, ...deviceShadow}]}>
            <Feather name={shareToIGStories ? "instagram" : "share"} size={24} color={black}/>
        </TouchableOpacity>

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
        borderWidth: 0,
        borderColor: black,
        borderRadius: 24,
        backgroundColor: redOpaque,
    },
    shareButton: {
        marginStart: width * 0.05,
    },
    starButton: {

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
import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';

import Colors from '../../config/Colors';
const {black, white} = Colors;

import QuoteCardActions from '../QuoteOfTheDay/QuoteCardActions';

const QuoteCell = ({quoteInfo}) => {

    const {author, quote} = quoteInfo;

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

    return (
        <View style={styles.quoteCellContainer}>
            <View style={styles.authorRow}>
                <Text style={styles.authorText}>{author}</Text>
            </View>
            <View style={[styles.quoteCell]}>
                <Text style={styles.quoteText}>{quote}</Text>
            </View>
                <QuoteCardActions />
        </View>
    )
}

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
    authorText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    quoteCell: {
        width: '100%',
        borderWidth: 2,
        borderColor: black,
        borderRadius: 10,
        alignItems: 'center',
        padding: width * 0.05,
    },
    quoteCellContainer: {
        width: "100%",
        paddingHorizontal: width * 0.02,
        marginVertical: height * 0.02,
    },
    quoteText: {
        
    }
});

export default QuoteCell;
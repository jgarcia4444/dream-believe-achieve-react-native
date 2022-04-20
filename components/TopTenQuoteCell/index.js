import React from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

import {Feather} from 'react-native-vector-icons';
import Colors from '../../config/Colors';
const {whiteOpaque, black} = Colors;

const TopTenQuoteCell = ({quoteInfo}) => {

    const {author, quote} = quoteInfo;

    return (
        <View style={styles.topTenQuote}>
            <View style={styles.topTenAuthorRow}>
                <Text style={styles.topTenAuthor}>{author}</Text>
            </View>
            <View style={styles.topTenQuoteCard}>
                <Text style={styles.topTenQuoteText}>{quote}</Text>
            </View>
        </View>
    )
}

const {width, height}= Dimensions.get('screen')

const styles = StyleSheet.create({
    topTenQuote: {
        width: width * 0.60,
        marginEnd: width * 0.05
    },
    topTenAuthorRow: {
        width: '100%',
    },
    topTenAuthor: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    topTenQuoteCard: {
        backgroundColor: whiteOpaque,
        borderRadius: 10,
        height: height * 0.15,
        justifyContent: 'center',
        paddingHorizontal: width * 0.02,
    },
});

export default TopTenQuoteCell;
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
                <Text style={styles.topTenQuote}>{quote}</Text>
            </View>
        </View>
    )
}

const {width, height}= Dimensions.get('screen')

const styles = StyleSheet.create({
    topTenQuote: {
        width: width * 0.45,
        marginEnd: width * 0.1
    },
    topTenAuthorRow: {
        width: '100%',
    },
    topTenAuthor: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    topTenQuoteCard: {
        backgroundColor: whiteOpaque,
        borderRadius: 10,
        padding: width * 0.05,
    },
});

export default TopTenQuoteCell;
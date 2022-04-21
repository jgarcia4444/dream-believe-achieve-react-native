import React from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, ScrollView } from 'react-native';

import {Feather} from 'react-native-vector-icons';
import Colors from '../../config/Colors';
const {whiteOpaque, black, gold} = Colors;

import QuoteCardActions from '../QuoteOfTheDay/QuoteCardActions';

const TopTenQuoteCell = ({quoteInfo}) => {

    const {author, quote, favorites} = quoteInfo;

    return (
        <View style={styles.topTenQuote}>
            <View style={styles.topTenAuthorRow}>
                <Text style={styles.topTenAuthor}>{author}</Text>
            </View>
            <View style={styles.topTenQuoteCard}>
                <ScrollView contentContainerStyle={styles.quoteScrollContainer}>
                    <Text style={styles.topTenQuoteText}>{quote}</Text>
                </ScrollView>
                <View style={styles.topTenQuoteFavoritesRow}>
                    <Text style={styles.topTenFavoritesCount}>{favorites}</Text>
                    <Feather name="star" size={14} color={black} />
                </View>
            </View>
            <QuoteCardActions />
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
    topTenFavoritesCount: {
        color: black,
    },
    topTenQuoteCard: {
        backgroundColor: whiteOpaque,
        borderRadius: 10,
        height: height * 0.15,
        justifyContent: 'center',
        padding: width * 0.02,
    },
    topTenQuoteFavoritesRow: {
        flexDirection:'row',
        height: '25%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    quoteScrollContainer: {
        height: '80%'
    },
});

export default TopTenQuoteCell;
import React from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

import {Feather} from 'react-native-vector-icons';

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

const styles = StyleSheet.create({
    topTenQuote: {

    },
    topTenAuthorRow: {

    },
    topTenAuthor: {

    },
    topTenQuoteCard: {

    },
    topTenQuote: {

    },
});

export default TopTenQuoteCell;
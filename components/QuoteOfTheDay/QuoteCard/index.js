import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../../../config/Colors';
const {black} = Colors;

const QuoteCard = () => {

    return (
        <View style={styles.quoteCard}>
            <Text>Quote Card</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    quoteCard: {
        width: '100%',
        height:  '60%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: black,
    },
});

export default QuoteCard;
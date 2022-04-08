import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const QuoteCard = () => {

    return (
        <View style={styles.quoteCard}>
            <Text>Quote Card</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    quoteCard: {
        width: '80%',
        height:  '60%',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default QuoteCard;
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import Colors from '../../config/Colors';
const {black, white} = Colors;

const QuoteCell = ({quoteInfo}) => {

    const {author, quote} = quoteInfo;

    return (
        <View style={styles.quoteCell}>
            <Text>{author}: {quote}</Text>
        </View>
    )
}

const {height} = Dimensions.get('screen');

const styles = StyleSheet.create({
    quoteCell: {
        width: '100%',
        height: height * 0.1,
        borderBottomWidth: 2,
        borderColor: black,
    }
});

export default QuoteCell;
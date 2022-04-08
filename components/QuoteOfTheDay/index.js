import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import GlobalStyles from '../../config/GlobalStyles';

import Colors from '../../config/Colors';
const {black, white, darkGray} = Colors;

import QuoteCard from './QuoteCard';
import QuoteCardActions from './QuoteCardActions';

const QuoteOfTheDay = () => {

    return (
        <View style={[styles.quoteOfTheDayContainer]}>
            <QuoteCard />
            <QuoteCardActions />
        </View>
    )
}

const styles = StyleSheet.create({
    quoteOfTheDayContainer: {
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default QuoteOfTheDay;
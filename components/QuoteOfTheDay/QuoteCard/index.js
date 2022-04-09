import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Colors from '../../../config/Colors';
const {black} = Colors;

const QuoteCard = ({quoteInfo}) => {

    const {author, quote} = quoteInfo;

    return (
        <View style={styles.quoteCard}>
            <Text>{quote}</Text>
            <Text>{author}</Text>
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

const mapStateToProps = state => {
    return {
        quoteInfo: state.session.dailyQuote.quoteInfo
    }
}

export default connect(
    mapStateToProps,
    null
)(QuoteCard);
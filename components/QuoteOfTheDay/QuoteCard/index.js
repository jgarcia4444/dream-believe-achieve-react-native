import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import Colors from '../../../config/Colors';
const {black, whiteOpaque} = Colors;

const QuoteCard = ({quoteInfo, shareRef}) => {

    const {author, quote} = quoteInfo;

    return (
        <View ref={shareRef} style={styles.quoteCard}>
            <View style={styles.quoteTextContainer}>
                <Text style={styles.quoteText}>"{quote}"</Text>
            </View>
            <View style={styles.quoteAuthorContainer}>
                <Text style={styles.quoteAuthor}>{author}</Text>
            </View>
        </View>
    )
};

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
    quoteCard: {
        width: '100%',
        height:  '60%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: whiteOpaque,
        borderRadius: 5,
        padding: width * 0.02,
    },
    quoteAuthor: {
        textAlign: 'right',
        fontWeight: 'bold',
        fontSize: 20,
    },
    quoteAuthorContainer: {
        width: '100%',
        height: '25%'
    },
    quoteText: {
        fontWeight: '300',
        fontSize: 16,
    },
    quoteTextContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: '75%'
    }
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
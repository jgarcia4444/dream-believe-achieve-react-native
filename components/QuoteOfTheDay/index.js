import React, { useEffect, } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import GlobalStyles from '../../config/GlobalStyles';

import Colors from '../../config/Colors';
const {black, white, darkGray} = Colors;

import QuoteCard from './QuoteCard';
import QuoteCardActions from './QuoteCardActions';
import getDailyQuote from '../../redux/actions/quoteActions/getDailyQuote';
import RefreshButton from './RefreshButton';

const QuoteOfTheDay = ({session, getDailyQuote}) => {

    const {dailyQuote, userInfo} = session;

    const {username} = userInfo

    const {quoteOfTheDayDate} = dailyQuote;

    const handleFetchQuote = () => {
        let dailyQuoteInfo = {
            username: username,
        };
        getDailyQuote(dailyQuoteInfo);
    }

    return (
        <View style={[styles.quoteOfTheDayContainer]}>
            {quoteOfTheDayDate === '' ?
                <TouchableOpacity onPress={handleFetchQuote}>
                    <Text>Load your first daily quote.</Text>
                </TouchableOpacity>
            :
            <>
                <RefreshButton />
                <QuoteCard />
                <QuoteCardActions />
            </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    quoteOfTheDayContainer: {
        width: '80%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const mapStateToProps = state => {
    return {
        session: state.session,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDailyQuote: (dailyQuoteInfo) => dispatch(getDailyQuote(dailyQuoteInfo)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QuoteOfTheDay);
import React, { useEffect, useState, useRef} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';

import GlobalStyles from '../../config/GlobalStyles';

import Colors from '../../config/Colors';
const {black, white, darkGray} = Colors;

import QuoteCard from './QuoteCard';
import QuoteCardActions from './QuoteCardActions';
import getDailyQuote from '../../redux/actions/quoteActions/getDailyQuote';
import RefreshButton from './RefreshButton';
import favoriteQuote from '../../redux/actions/quoteActions/favoriteQuote';
import unfavoriteQuote from '../../redux/actions/quoteActions/unfavoriteQuote';

const QuoteOfTheDay = ({session, getDailyQuote, favoriteQuote, unfavoriteQuote }) => {

    const [isFavorited, setIsFavorited] = useState(false);

    const {dailyQuote, userInfo, favoriteQuotes} = session;

    const {username} = userInfo;

    const {quoteOfTheDayDate, quoteInfo} = dailyQuote;

    const opacityVal = useRef(new Animated.Value(0)).current;
    

    const handleFetchQuote = () => {
        let dailyQuoteInfo = {
            username: username,
        };
        getDailyQuote(dailyQuoteInfo);
    };

    const handleFavoritePress = () => {
        const {id} = quoteInfo;
        let favoriteInfo = {
            username: username,
            quoteId: id
        }
        if (!isFavorited) {
            favoriteQuote(favoriteInfo);
        } else {
            unfavoriteQuote(favoriteInfo);
        }
    }

    const checkIfFavorited = () => {
        if (favoriteQuotes.length > 0) {
            if (favoriteQuotes.some(quote => quote.id === quoteInfo.id)) {
                setIsFavorited(true);
            } else {
                setIsFavorited(false);
            }
        } else {
            setIsFavorited(false)
        }
    }

    const fadeIn = () => {
        Animated.timing(opacityVal, {
            toValue: 1,
            duration: 750,
            useNativeDriver: true
        }).start();
    }


    useEffect(() => {
        checkIfFavorited()
        fadeIn()
    }, [favoriteQuotes.length])

    return (
        <Animated.View style={[styles.quoteOfTheDayContainer, {opacity: opacityVal}]}>
            {quoteOfTheDayDate === '' ?
                <TouchableOpacity onPress={handleFetchQuote}>
                    <Text>Load your first daily quote.</Text>
                </TouchableOpacity>
            :
            <>
                <RefreshButton />
                <QuoteCard />
                <QuoteCardActions isFavorited={isFavorited} handleFavoritePress={handleFavoritePress} />
            </>
            }
        </Animated.View>
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
        favoriteQuote: (favoriteInfo) => dispatch(favoriteQuote(favoriteInfo)),
        unfavoriteQuote: (unfavoriteInfo) => dispatch(unfavoriteQuote(unfavoriteInfo)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QuoteOfTheDay);
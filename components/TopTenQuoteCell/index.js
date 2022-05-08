import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import {Feather} from 'react-native-vector-icons';
import Colors from '../../config/Colors';
const {whiteOpaque, black, gold, white} = Colors;

import QuoteCardActions from '../QuoteOfTheDay/QuoteCardActions';
import favoriteQuote from '../../redux/actions/quoteActions/favoriteQuote';
import unfavoriteQuote from '../../redux/actions/quoteActions/unfavoriteQuote';

const TopTenQuoteCell = ({position, quoteInfo, favoriteQuotes, username, favoriteQuote, unfavoriteQuote}) => {

    const {author, quote, favorites, id} = quoteInfo;

    const [isFavorited, setIsFavorited] = useState()

    const handleFavoritePress = () => {
        let favoriteInfo = {
            username: username,
            quoteId: id
        }
        if (isFavorited) {
            unfavoriteQuote(favoriteInfo);
        } else {
            favoriteQuote(favoriteInfo)
        }
    }

    const checkIfLiked = () =>{
        if (favoriteQuotes.some(quote => quote.id === id)) {
            setIsFavorited(true);
        } else {
            setIsFavorited(false);
        }
    }

    useEffect(() => {
        if (favoriteQuotes.length > 0) {
            checkIfLiked()
        } else {
            setIsFavorited(false);
        }
    })

    const positionBackground = (
        <View style={styles.positionContainer}>
            <Text style={styles.position}>{position}</Text>
        </View>
    )

    return (
        <View style={styles.topTenQuote}>
            {positionBackground}
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
            <QuoteCardActions isFavorited={isFavorited} handleFavoritePress={handleFavoritePress} />
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
        fontWeight: 'bold',
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
    position: {
        fontSize: 72,
        color: white,
        fontWeight: 'bold',
        opacity: 0.15,
    },
    positionContainer: {
        position: 'absolute',
        width: '100%',
        height: height * 0.20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    quoteScrollContainer: {
        height: '80%'
    },
});

const mapStateToProps = state => {
    return {
        favoriteQuotes: state.session.favoriteQuotes,
        username: state.session.userInfo.username
    }
}

const mapDispatchToProps = dispatch => {
    return {
        favoriteQuote: (favoriteInfo) => dispatch(favoriteQuote(favoriteInfo)),
        unfavoriteQuote: (favoriteInfo) => dispatch(unfavoriteQuote(favoriteInfo)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopTenQuoteCell);
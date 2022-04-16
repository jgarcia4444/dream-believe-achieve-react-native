import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Feather } from 'react-native-vector-icons';

import Colors from '../../config/Colors';
const {black, white} = Colors;

import QuoteCardActions from '../QuoteOfTheDay/QuoteCardActions';
import unfavoriteQuote from '../../redux/actions/quoteActions/unfavoriteQuote';

const QuoteCell = ({quoteInfo, unfavoriteQuote, username}) => {

    const {author, quote, id, favorites} = quoteInfo;

    const deviceShadow = Platform.OS === 'ios' ? {
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.7,
        shadowRadius: 1
    } : {
        elevation: 1
    }

    const handleFavoritePress = () => {
        let favoriteInfo = {
            username: username,
            quoteId: id
        }
        unfavoriteQuote(favoriteInfo);
    }

    return (
        <View style={styles.quoteCellContainer}>
            <View style={styles.authorRow}>
                <Text style={styles.authorText}>{author}</Text>
            </View>
            <View style={[styles.quoteCell]}>
                <Text style={styles.quoteText}>{quote}</Text>
                <View style={styles.favoritesRow}>
                    <Text style={styles.favoritesCount}>{favorites}</Text>
                    <Feather name="star" size={12} color={black} />
                </View>
            </View>
                <QuoteCardActions isFavorited={true} handleFavoritePress={handleFavoritePress} />
        </View>
    )
}

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
    authorText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    favoritesCount: {
        fontSize: 12,
    },
    favoritesRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        marginTop: height * 0.01
    },
    quoteCell: {
        width: '100%',
        borderWidth: 0,
        borderColor: black,
        borderRadius: 10,
        alignItems: 'flex-start',
        padding: width * 0.05,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
    quoteCellContainer: {
        width: "100%",
        paddingHorizontal: width * 0.02,
        marginVertical: height * 0.02,
    },
    quoteText: {
        color: black,
    }
});

const mapStateToProps = state => {
    return {
        username: state.session.userInfo.username
    }
}

const mapDispatchToProps = dispatch => {
    return {
        unfavoriteQuote: (favoriteInfo) => dispatch(unfavoriteQuote(favoriteInfo)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QuoteCell);
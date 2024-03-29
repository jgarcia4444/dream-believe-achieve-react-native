import React from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import { connect } from 'react-redux';

import GlobalStyles from '../../config/GlobalStyles';
const { container } = GlobalStyles;

import TopTenQuoteCell from './TopTenQuoteCell';

const TopTenQuotes = ({topTenQuotes}) => {

    const renderTopTenQuote = ({item, index}) => {
        return (
            <View style={styles.topTenQuoteContainer}>
                <TopTenQuoteCell position={index + 1} quoteInfo={item} />
            </View>
        )
    }

    return (
        <View style={[styles.communityQuotesContainer]}>
            <View style={styles.communityFavoritesRow}>
                <Text style={styles.communityFavoritesTitle}>
                    Community Favorites
                </Text>
            </View>
            {topTenQuotes.length === 0 ?
                <View style={styles.noCommunityQuotesContainer}>
                    <Text style={styles.noCommunityQuotesText}>
                        Community quotes are being calculated...
                    </Text>
                </View>
            :
                <FlatList 
                    horizontal={true}
                    data={topTenQuotes}
                    renderItem={renderTopTenQuote}
                    keyExtractor={item => item.id}
                />
            }
        </View>
    )
}

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    communityFavoritesRow: {

    },
    communityFavoritesTitle: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    communityQuotesContainer: {
        height: height * 0.35,
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    noCommunityQuotesContainer: {

    },
    noCommunityQuotesText: {

    }
});

const mapStateToProps = state => {
    return {
        topTenQuotes: state.session.topTenQuotes,
    }
}

export default connect(
    mapStateToProps,
    null
)(TopTenQuotes);
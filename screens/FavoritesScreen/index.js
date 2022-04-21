import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Dimensions, Text } from 'react-native';
import { connect } from 'react-redux';
import GlobalStyles from '../../config/GlobalStyles';
const {container} = GlobalStyles;

import fetchFavorites from '../../redux/actions/quoteActions/fetchFavorites';
import QuoteCell from '../../components/QuoteCell';
import Background from '../../components/Background';
import TopTenQuoteCell from '../../components/TopTenQuoteCell';

const FavoritesScreen = ({fetchFavorites, username, favoriteQuotes, topTenQuotes}) => {

    const [loadFavorites, setLoadFavorites] = useState(true);

    console.log(topTenQuotes);

    useEffect(() => {
        if (loadFavorites === true) {
            fetchFavorites(username);
            setLoadFavorites(false);
        }
    },[loadFavorites])

    const renderListItem = ({item}) => {
        return <QuoteCell quoteInfo={item} />
    }

    const renderTopTenQuote = ({item}) => {
        return (
            <View style={styles.topTenQuoteContainer}>
                <TopTenQuoteCell quoteInfo={item} />
            </View>
        )
    }

    return (
        <View style={[styles.favoritesContainer]}>
            <Background />
            <View style={styles.communityQuotesContainer}>
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
            <View style={styles.yourFavorites}>
                <View style={styles.yourFavoritesLabelRow}>
                    <Text style={styles.yourFavoritesTitle}>Your Favorites</Text>
                </View>
                {favoriteQuotes.length === 0 ?
                    <View style={styles.noQuotesContainer}>
                        <Text style={styles.noQuotesText}>No favorited quotes yet...</Text>
                    </View>
                    :
                    <FlatList
                    data={favoriteQuotes}
                    renderItem={renderListItem}
                    keyExtractor={item => item.id}
                    />

                }
            </View>
        </View>
    )
};

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
    communityFavoritesTitle: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    communityQuotesContainer: {
        height: height * 0.35,
        justifyContent: 'center',
    },
    favoritesContainer: {
        paddingTop: height * 0.05,
        paddingHorizontal: width * 0.03,
        width: width,
        height: height,
    },
    noQuotesContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        height: height
    },
    noQuotesText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    yourFavorites: {
        height: height * 0.65,
        paddingBottom: height * 0.15,
    },
    yourFavoritesTitle: {
        fontSize: 28,
        fontWeight: 'bold',
    },
});

const mapStateToProps = state => {
    return {
        username: state.session.userInfo.username,
        favoriteQuotes: state.session.favoriteQuotes,
        topTenQuotes: state.session.topTenQuotes,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchFavorites: (username) => dispatch(fetchFavorites(username)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FavoritesScreen);
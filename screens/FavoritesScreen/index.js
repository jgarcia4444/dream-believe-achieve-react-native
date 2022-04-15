import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Dimensions, Text } from 'react-native';
import { connect } from 'react-redux';

import fetchFavorites from '../../redux/actions/quoteActions/fetchFavorites';

const FavoritesScreen = ({fetchFavorites, username, favoriteQuotes}) => {

    const [loadFavorites, setLoadFavorites] = useState(true);

    useEffect(() => {
        fetchFavorites(username);
    })

    const renderListItem = ({item}) => {
        return <QuoteCell quoteInfo={item} />
    }

    return (
        <View style={styles.favoritesContainer}>
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
    )
};

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
    favoritesContainer: {
        paddingVertical: height * 0.02,
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
});

const mapStateToProps = state => {
    return {
        username: state.session.userInfo.username,
        favoriteQuotes: state.session.favoriteQuotes
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
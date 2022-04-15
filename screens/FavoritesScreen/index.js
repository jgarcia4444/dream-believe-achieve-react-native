import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Dimensions, Text } from 'react-native';
import { connect } from 'react-redux';

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
                <View>
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

const {height} = Dimensions.get('screen');

const styles = StyleSheet.create({
    favoritesContainer: {
        paddingVertical: height * 0.02,
    }
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
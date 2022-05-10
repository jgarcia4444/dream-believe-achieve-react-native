import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';

const FavoriteQuotes = ({topTenQuotes}) => {

    const renderItem = ({item}) => {
        return <FavoriteQuoteCell quoteInfo={item} />
    }

    return (
        <View style={styles.favoriteQuotesContainer}>
            <FlatList 
                data={topTenQuotes}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    favoriteQuotesContainer: {

    },
});

const mapStateToProps = state => {
    return {
        topTenQuotes: state.session.topTenQuotes
    }
}

export default connect(
    mapStateToProps,
    null
)(FavoriteQuotes);
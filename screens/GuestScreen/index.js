import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import TopTenQuotes from '../../components/TopTenQuotes';

import GlobalStyles from '../../config/GlobalStyles';
const { container } = GlobalStyles;

import fetchTopTenQuotes from '../../redux/actions/quoteActions/fetchTopTenQuotes';

const GuestScreen = ({navigation, username}) => {

    useEffect(() => {
        if (username !== "") {
            navigation.navigate("SuccessScreen"); 
        } else {
            fetchTopTenQuotes();
        }
    },[username])

    const displayTopTenQuotes = () => {
        return topTenQuotesLoading === true ? <ActivityIndicator size="large" /> : <TopTenQuotes />
    }

    return (
        <View style={[container, styles.guestScreenContainer]}>
            {displayTopTenQuotes()}
        </View>
    )
};

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    guestScreenContainer: {

    },
});

const mapStateToProps = state => {
    return {
        username: state.session.userInfo.username
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTopTenQuotes: () => dispatch(fetchTopTenQuotes())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GuestScreen);
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, Animated } from 'react-native';
import { connect } from 'react-redux';
import TopTenQuotes from '../../components/TopTenQuotes';

import GlobalStyles from '../../config/GlobalStyles';
const { container } = GlobalStyles;

import fetchTopTenQuotes from '../../redux/actions/quoteActions/fetchTopTenQuotes';

import Background from '../../components/Background';

const GuestScreen = ({navigation, username, topTenQuotesLoading, fetchTopTenQuotes}) => {

    useEffect(() => {
        fadeViewIn();
        if (username !== "") {
            navigation.navigate("SuccessScreen"); 
        } else {
            fetchTopTenQuotes();
        }
    },[username])

    const displayTopTenQuotes = () => {
        return topTenQuotesLoading === true ? <ActivityIndicator size="large" /> : <TopTenQuotes />
    }

    const viewOpacity = useRef(new Animated.Value(0)).current;

    const fadeViewIn = () => {
        Animated.timing(viewOpacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start();
    }

    return (
        <Animated.View style={[container, styles.guestScreenContainer, {opacity: viewOpacity}]}>
            <Background />
            {displayTopTenQuotes()}
        </Animated.View>
    )
};

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    guestScreenContainer: {

    },
});

const mapStateToProps = state => {
    return {
        username: state.session.userInfo.username,
        topTenQuotesLoading: state.session.topTenQuotesLoading,
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
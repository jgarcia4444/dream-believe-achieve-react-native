import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, Animated, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import TopTenQuotes from '../../components/TopTenQuotes';

import GlobalStyles from '../../config/GlobalStyles';
const { container } = GlobalStyles;
import Colors from '../../config/Colors';
const {white} = Colors;

import fetchTopTenQuotes from '../../redux/actions/quoteActions/fetchTopTenQuotes';

import Background from '../../components/Background';

const GuestScreen = ({navigation, username, topTenQuotesLoading, fetchTopTenQuotes, topTenQuotes}) => {

    const secondaryOpacity = useRef(new Animated.Value(0)).current;
    const viewOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        fadeViewIn();
        if (username !== "") {
            navigation.navigate("SuccessScreen"); 
        } else if (topTenQuotes.length === 0) {
            fetchTopTenQuotes();
        }
        if (topTenQuotesLoading === false) {
            fadeInSecondary()
        }
    },[username, topTenQuotesLoading])

    const displayTopTenQuotes = () => {
        return topTenQuotesLoading === true ? <ActivityIndicator color={white} size="large" /> : <TopTenQuotes />
    }

    

    const fadeViewIn = () => {
        Animated.timing(viewOpacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start();
    }

    const features = ["Daily Quote", "Favorite Quotes", "Share Quotes"];

    const renderFeatures = () => {
        return topTenQuotesLoading === false && features.map((feature, i) => <Text key={i} style={[styles.featureText]}>- {feature}</Text>)
    }

    
    const fadeInSecondary = () => {
        Animated.timing(secondaryOpacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start();
    }

    return (
        <Animated.View style={[container, styles.guestScreenContainer, {opacity: viewOpacity}]}>
            <Background />
            {displayTopTenQuotes()}
            <Animated.View style={[styles.appInfoContainer, {opacity: secondaryOpacity}]}>
                <View style={[styles.featureContainer]}>
                    {topTenQuotesLoading === false && 
                        <Text style={[styles.featuresTitleText]}>More Features Available</Text>
                    }
                    {renderFeatures()}
                </View>
                <Text style={[styles.featuresTitleText]}>To use these features</Text>
                <View style={[styles.buttonRow]}>
                    <TouchableOpacity>
                        <Text>Create an account</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.buttonRow]}>
                    <TouchableOpacity>
                        <Text>Login</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </Animated.View>
    )
};

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    appInfoContainer: {
        width: '100%',
    },
    featureContainer: {
        marginBottom: height * 0.02,
    },
    featureText: {
        fontSize: 16,
    },
    featuresTitleText: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    guestScreenContainer: {

    },
});

const mapStateToProps = state => {
    return {
        username: state.session.userInfo.username,
        topTenQuotesLoading: state.session.topTenQuotesLoading,
        topTenQuotes: state.session.topTenQuotes,
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
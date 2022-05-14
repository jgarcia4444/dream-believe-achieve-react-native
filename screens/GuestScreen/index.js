import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, Animated, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import TopTenQuotes from '../../components/TopTenQuotes';

import GlobalStyles from '../../config/GlobalStyles';
const { container } = GlobalStyles;
import Colors from '../../config/Colors';
const {white, black, blackOpaque, whiteOpaque} = Colors;

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
                    <TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={[styles.actionButton, styles.signUpButton]}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.orContainer}>
                    <Text>Or</Text>
                </View>
                <View style={[styles.buttonRow]}>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")} style={[styles.actionButton, styles.loginButton]}>
                        <Text style={[styles.buttonText, {color: white}]}>Login</Text>
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
    actionButton: {
        width: '75%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0,
        borderColor: black,
        borderRadius: width / 2,
        paddingVertical: height * 0.02,
    },
    buttonRow: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: height * 0.02,
    },
    buttonText: {
        fontSize: 24,
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
    orContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: "center",
    },
    loginButton: {
        backgroundColor: blackOpaque
    },
    signUpButton: {
        backgroundColor: whiteOpaque
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
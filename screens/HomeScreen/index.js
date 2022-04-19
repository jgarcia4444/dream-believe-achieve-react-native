import React, {useEffect, useRef} from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { connect } from 'react-redux';

import GlobalStyles from '../../config/GlobalStyles';
const {container} = GlobalStyles;

import Colors from '../../config/Colors';
const { white, black, darkGray, blue, } = Colors;

import QuoteOfTheDay from '../../components/QuoteOfTheDay';
import Background from '../../components/Background';

const HomeScreen = ({userInfo, quoteFavoriting}) => {

    const {username} = userInfo;

    const timeBasedGreeting = () => {
        let date = new Date();
        let hour = date.getHours();
        console.log(hour);
        if (hour >= 4 && hour < 12) {
            return "Good Morning,";
        } else if (hour >= 12 && hour < 17) {
            return "Good Afternoon,";
        } else {
            return "Good Evening,";
        }
    }

    return (
        <View style={[container, styles.homeContainer]}>
            <StatusBar networkActivityIndicatorVisible={quoteFavoriting}/>
            <Background />
            <View style={styles.greetingRow}>
                <View style={styles.timeGreetingRow}>
                    <Text style={styles.timeGreeting}>{timeBasedGreeting()}</Text>
                </View>
                <View style={styles.usernameRow}>
                    <Text style={styles.username}>{username}</Text>
                </View>
            </View>
            <QuoteOfTheDay />
        </View>
    )
};

const {height} = Dimensions.get('screen');

const styles = StyleSheet.create({
    greetingRow: {
        height: '25%',
    },
    homeContainer: {
        justifyContent: 'flex-start',
    },
    timeGreeting: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    timeGreetingRow: {
        marginTop: height * 0.05,
        width: '75%',
    },
    username: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    usernameRow: {
        width: '75%',
    },
});

const mapStateToProps = state => {
    return {
        userInfo: state.session.userInfo,
        quoteFavoriting: state.session.quoteFavoriting,
    }
};

export default connect(
    mapStateToProps,
    null
)(HomeScreen);
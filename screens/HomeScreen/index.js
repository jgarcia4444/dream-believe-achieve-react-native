import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import GlobalStyles from '../../config/GlobalStyles';
const {container} = GlobalStyles;

import Colors from '../../config/Colors';
import QuoteOfTheDay from '../../components/QuoteOfTheDay';
const {white, black, darkGray, blue} = Colors;

const HomeScreen = ({userInfo, signOut}) => {

    const {username} = userInfo;

    const timeBasedGreeting = () => {
        let date = new Date();
        let hour = date.getHours();
        if (hour <= 4 && hour < 12) {
            return "Good Morning,";
        } else if (hour >= 12 && hour < 17) {
            return "Good Afternoon,";
        } else {
            return "Good Evening,";
        }
    }

    return (
        <View style={[container, styles.homeContainer]}>
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

const {height, width} = Dimensions.get('screen');

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
        userInfo: state.session.userInfo
    }
};

export default connect(
    mapStateToProps,
    null
)(HomeScreen);
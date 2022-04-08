import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import GlobalStyles from '../../config/GlobalStyles';
const {container} = GlobalStyles;

import Colors from '../../config/Colors';
const {white, black, darkGray} = Colors;

const HomeScreen = ({userInfo}) => {

    const {username} = userInfo;

    console.log("Here is the userInfo from Home screen", userInfo)

    return (
        <View style={[container]}>
            <Text>Home Screen of {username}</Text>
        </View>
    )
};

const styles = StyleSheet.create({

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
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import GlobalStyles from '../../config/GlobalStyles';
const {container} = GlobalStyles;

import Colors from '../../config/Colors';
import { connect } from 'react-redux';
const {white, black, darkGray} = Colors;

const HomeScreen = ({userInfo}) => {

    const {username} = userInfo;

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
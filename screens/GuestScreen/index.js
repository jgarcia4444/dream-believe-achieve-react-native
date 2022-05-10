import React, {useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import GlobalStyles from '../../config/GlobalStyles';
import { useEffect } from 'react';
const { container } = GlobalStyles;

const GuestScreen = ({navigation, username}) => {

    useEffect(() => {
        if (username !== "") {
            navigation.navigate("SuccessScreen");
        }
    },[username])

    return (
        <View style={[container. styles.guestScreenContainer]}>
            <Text>Guest Screen</Text>
        </View>
    )
};

const styles = StyleSheet.create({

});

const mapStateToProps = state => {
    username: state.session.userInfo.username
}

export default connect(
    mapStateToProps,
    null
)(GuestScreen);
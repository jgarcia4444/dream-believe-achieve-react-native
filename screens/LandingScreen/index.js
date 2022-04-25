import React, {useRef, useEffect} from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import GlobalStyles from '../../config/GlobalStyles';
const { container } = GlobalStyles;

import Colors from '../../config/Colors';
const {darkGray, white} = Colors;

import LandingPageActions from '../../components/LandingPageActions';
import Background from '../../components/Background';

const LandingScreen = ({username}) => {

    const viewOpacity = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation()

    useEffect(() => {
        fadeInView()
    });

    const fadeInView = () => {
        Animated.timing(viewOpacity, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
        }).start(() => {
            if (username !== "") {
                navigation.navigate('SuccessScreen')
            }
        });
    }

    return (
        <Animated.View style={[container, {opacity: 0}, {opacity: viewOpacity}]}>
            <Background />
            <View style={styles.appNameContainer}>
                <Text style={styles.appNameAbbreviated}>DBA</Text>
                <Text style={styles.appNameFull}>Dream Believe Achieve</Text>
            </View>
            <LandingPageActions />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    appNameContainer: {
        height: '33%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    appNameAbbreviated: {
        fontSize: 48,
        fontWeight: 'bold'
    },
    appNameFull: {
        color: white,
        fontWeight: '100',
    },
    
});

const mapStateToProps = state => {
    return {
        username: state.session.userInfo.username
    }
}

export default connect(
    mapStateToProps,
    null
)(LandingScreen);
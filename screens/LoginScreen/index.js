import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import GlobalStyles from '../../config/GlobalStyles';
const { container } = GlobalStyles;

const LoginScreen = () => {

    return (
        <View style={[container]}>
            <Text>Login Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default LoginScreen;
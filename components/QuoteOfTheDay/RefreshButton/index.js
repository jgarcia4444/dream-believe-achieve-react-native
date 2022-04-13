import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';

const RefreshButton = ({quoteOfTheDayDate, handleRefreshPress}) => {

    const setRefreshDisplay = () => {
        if (quoteOfTheDayDate === "" || aDayHasPassed(quoteOfTheDayDate)) {

        } else {
            // Display a countdown timer
        }
    }

    const aDayHasPassed = (quoteDate) => {
        let quoteDateYear = quoteDate.getFullYear();
        let quoteDateMonth = quoteDate.getMonth()
        let quoteDateNumber = quoteDate.getDate();
        let quoteDateHours = quoteDate.getHours();
        let quoteDateMinutes = quoteDate.getMinutes();
        let quoteDateSeconds = quoteDate.getSeconds();

        let todaysDate = new Date();
        let todaysDateYear = todaysDate.getFullYear();
        let todaysDateMonth = todaysDate.getMonth();
        let todaysDateNumber = todaysDate.getDate();
        let todaysDateHours = todaysDate.getHours();
        let todaysDateMinutes = todaysDate.getMinutes();
        let todaysDateSeconds = todaysDate.getSeconds();

        if (quoteDateYear < todaysDateYear) {
            return true;
        } else if (quoteDateYear === todaysDateYear) {
            if (quoteDateMonth < todaysDateMonth) {
                let monthDifferential = todaysDateMonth - quoteDateMonth;
                if (monthDifferential < 2) {
                    if (todaysDateNumber > 1) {
                        return true
                    } else {
                        if ((quoteDateHours === todaysDateHours && quoteDateMinutes === todaysDateMinutes) && (quoteDateSeconds === todaysDateSeconds)) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                } else {
                    return true
                }
            } else if (quoteDateMonth === todaysDateMonth) {
                let dateNumberDifferential = quoteDateNumber - todaysDateNumber
                if (dateNumberDifferential === 1) {
                    if ((quoteDateHours === todaysDateHours && quoteDateMinutes === todaysDateMinutes) && (quoteDateSeconds === todaysDateSeconds)) {
                        return true;
                    } else {
                        return false;
                    }
                } else if (dateNumberDifferential > 1) {
                    return true;
                } else {
                    return false
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    return (
        <View style={styles.refreshButtonRow}>
            <TouchableOpacity style={styles.refreshButton}>
                <Text style={styles.countDownText}>23:12</Text>
            </TouchableOpacity>
        </View>
    )
};

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
    countDownText: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    refreshButton: {
        width: width * 0.15,
        height: width * 0.15,
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    refreshButtonRow: {
        width: '100%',
        justifyContent: 'center',
        alignItems:'flex-end',
        marginBottom: height * 0.02,
    }
});

const mapStateToProps = state => {
    return {
        quoteOfTheDayDate: state.session.dailyQuote.quoteOfTheDayDate
    }
}

export default connect(
    mapStateToProps,
    null
)(RefreshButton);

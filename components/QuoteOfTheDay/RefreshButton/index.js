import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';

import { Feather } from 'react-native-vector-icons';

import { connect } from 'react-redux';

const RefreshButton = ({quoteOfTheDayDate, handleRefreshPress}) => {

    const [timeObject, setTimeObject] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });


    const setTimeHours = () => {
        console.log("Quote of the day date from the refresh button set time hours", quoteOfTheDayDate);
        let dailyQuoteDate = new Date(quoteOfTheDayDate);
        console.log(dailyQuoteDate);
        let todaysDate = new Date();
        console.log(todaysDate);

        let quoteDay = dailyQuoteDate.getDate();
        let todaysDay = todaysDate.getDate();

        let quoteHours = dailyQuoteDate.getHours();
        let todaysHours = todaysDate.getHours();

        if (quoteHours < todaysHours) {
            let howManyToTwentyThree = 23 - todaysHours;
            return howManyToTwentyThree + quoteHours;
        } else if (quoteHours === todaysHours && quoteDay === todaysDay) {
            return 23;
        } else if (quoteHours === todaysHours && quoteDay !== todaysDay) {
            return 0;
        } else {
            return quoteHours - todaysHours;
        }
    }

    const setTimeMinutes = () => {
        let dailyQuoteDate = new Date(quoteOfTheDayDate);
        let todaysDate = new Date();

        let quoteHour = dailyQuoteDate.getHours();
        let todaysHour = todaysDate.getHours();

        let quoteMinutes = dailyQuoteDate.getMinutes();
        let todaysMinutes = todaysDate.getMinutes();

        if (quoteMinutes < todaysMinutes) {
            let howManyToSixty = 60 - todaysMinutes;
            return howManyToSixty + quoteMinutes;
        } else if (quoteMinutes === todaysMinutes && quoteHour === todaysHour) {
            return 59;
        } else if (quoteMinutes === todaysMinutes && quoteHour !== todaysHour) {
            return 0;
        } else {
            return quoteMinutes - todaysMinutes;
        }
    }

    const setTimeSeconds = () => {
        let dailyQuoteDate = new Date(quoteOfTheDayDate);
        let todaysDate = new Date();

        let quoteSeconds = dailyQuoteDate.getSeconds();
        let todaysSeconds = todaysDate.getSeconds();

        if (quoteSeconds < todaysSeconds) {
            let howManyToSixty = 60 - todaysSeconds;
            return howManyToSixty + quoteSeconds;
        } else if (quoteSeconds === todaysSeconds) {
            return 0;
        } else {
            return todaysSeconds - quoteSeconds;
        }
    }

    const { hours, minutes, seconds } = timeObject;

    const setRefreshDisplay = () => {
        if (quoteOfTheDayDate === "" || aDayHasPassed(quoteOfTheDayDate)) {
            return <Feather name="rotate-cw" size={height * 0.05} />
        } else {
            return (
                <Text style={styles.countDownText}>{configuredNumber(hours)}:{configuredNumber(minutes)}.{configuredNumber(seconds)}</Text>
            )
        }
    }

    const aDayHasPassed = (quoteDateString) => {
        let quoteDate = new Date(quoteDateString)
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


    const configuredNumber = (timeNum) => {
        if (timeNum < 10) {
            return `0${timeNum}`;
        } else {
            return timeNum
        }
    }

    useEffect(() => {
        if (!aDayHasPassed(quoteOfTheDayDate)) {
            if ((hours === 0 && minutes === 0) && (seconds === 0)) {
                let newHours = setTimeHours();
                let newMinutes = setTimeMinutes();
                let newSeconds = setTimeSeconds();
                console.log("New Hours:", newHours);
                setTimeObject({
                    hours: newHours,
                    minutes: newMinutes,
                    seconds: newSeconds
                })
            } else {
                let timeInterval = setInterval(() => {
                    adjustTime();
                    clearInterval(timeInterval);
                }, 1000)
            }
        }
    },[seconds])

    const adjustTime = () => {
        var newSeconds = seconds - 1;
        if (newSeconds >= 0) {
            setTimeObject({
                ...timeObject,
                seconds: newSeconds,
            })
        } else {
            newSeconds = 59;
            var newMinutes = minutes - 1;
            if (newMinutes >= 0) {
                setTimeObject({
                    ...timeObject,
                    minutes: newMinutes,
                    seconds: newSeconds
                })
            } else {
                newMinutes = 59;
                var newHours = hours - 1;
                if (hours >= 0) {
                    setTimeObject({
                        hours: newHours,
                        minutes: newMinutes,
                        seconds: newSeconds
                    })
                }
            }
        }
    }

    const alertUser = () =>
        Alert.alert(
            "Time Left",
            `24 hours must pass before your next daily quote is available. There is ${hours} hours left, ${minutes} minutes left, and ${seconds} seconds left.`,
            [
                {
                    text: 'Close',
                    style: 'cancel'
                }
            ]
        )

    const onPressFunction = quoteOfTheDayDate === "" || aDayHasPassed(quoteOfTheDayDate) ? handleRefreshPress : alertUser;

    return (
        <View style={styles.refreshButtonRow}>
            <TouchableOpacity onPress={onPressFunction} style={styles.refreshButton}>
                {setRefreshDisplay()}
            </TouchableOpacity>
        </View>
    )
};

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
    countDownText: {
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    refreshButton: {
        width: width * 0.15,
        height: width * 0.15,
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: (width * 0.15) / 2,
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

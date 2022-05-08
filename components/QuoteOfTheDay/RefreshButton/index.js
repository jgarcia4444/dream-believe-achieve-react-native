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
        let dailyQuoteDate = new Date(quoteOfTheDayDate);
        let todaysDate = new Date();

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
        if (quoteOfTheDayDate === "" || aDayHasPassed()) {
            return <Feather name="rotate-cw" size={height * 0.05} />
        } else {
            return (
                <Text style={styles.countDownText}>{configuredNumber(hours)}:{configuredNumber(minutes)}.{configuredNumber(seconds)}</Text>
            )
        }
    }

    const aDayHasPassed = () => {
        let dailyQuoteDate = new Date(quoteOfTheDayDate)
        let todaysDate = new Date();

        let dailyQuoteDateYear = dailyQuoteDate.getFullYear();
        let todaysDateYear = todaysDate.getFullYear();
        let yearDifferential = todaysDateYear - dailyQuoteDateYear;

        if (yearDifferential > 1) {
            return true;
        } else if (yearDifferential <= 1 && yearDifferential >= 0) {
            let dailyQuoteDateMonth = dailyQuoteDate.getMonth();
            let todaysDateMonth = todaysDate.getMonth();
            let monthDifferential = todaysDateMonth - dailyQuoteDateMonth;
            
            if (monthDifferential > 1) {
                return true;
            } else if (monthDifferential === 0) {
                let todaysDateNumber = todaysDate.getDate();
                let dailyQuoteDateNumber = dailyQuoteDate.getDate();
                let dateDifferential = todaysDateNumber - dailyQuoteDateNumber;
                if (dateDifferential > dailyQuoteDateNumber + 1) {
                    return true;
                } else if (dateDifferential - dailyQuoteDateNumber === 1) {
                    let dailyQuoteHours = dailyQuoteDate.getHours();
                    let todaysHours = todaysDate.getHours();
                    let hourDifferential = todaysHours - dailyQuoteHours;
                    if (hourDifferential > 0) {
                        return true;
                    } else if (hourDifferential === 0) {
                        let dailyQuoteMinutes = dailyQuoteDate.getMinutes();
                        let todaysMinutes = todaysDate.getMinutes();
                        let minutesDifferential = todaysMinutes - dailyQuoteMinutes;

                        if (minutesDifferential === 0) {
                            let dailyQuoteSeconds = dailyQuoteDate.getSeconds();
                            let todaysSeconds = todaysDate.getSeconds();
                            if (todaysSeconds <= dailyQuoteSeconds) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (minutesDifferential > 0) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else if (monthDifferential < 0) {
                if (monthDifferential * -1 < 11 && monthDifferential * -1 > 0) {
                    return true;
                } else if (monthDifferential === -11) {
                    let todaysDateNumber = todaysDate.getDate();
                    let dailyQuoteDateNumber = dailyQuoteDate.getDate();
                    let dateDifferential = (todaysDateNumber - dailyQuoteDateNumber) * -1;
                    if (dateDifferential > dailyQuoteDateNumber + 1) {
                        return true;
                    } else if (dateDifferential - dailyQuoteDateNumber === 1) {
                        let dailyQuoteHours = dailyQuoteDate.getHours();
                        let todaysHours = todaysDate.getHours();
                        let hourDifferential = todaysHours - dailyQuoteHours;
                        if (hourDifferential > 0) {
                            return true;
                        } else if (hourDifferential === 0) {
                            let dailyQuoteMinutes = dailyQuoteDate.getMinutes();
                            let todaysMinutes = todaysDate.getMinutes();
                            let minutesDifferential = todaysMinutes - dailyQuoteMinutes;

                            if (minutesDifferential === 0) {
                                let dailyQuoteSeconds = dailyQuoteDate.getSeconds();
                                let todaysSeconds = todaysDate.getSeconds();
                                if (todaysSeconds <= dailyQuoteSeconds) {
                                    return true;
                                } else {
                                    return false;
                                }
                            } else if (minutesDifferential > 0) {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                } else {
                    return false;
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
        if (!aDayHasPassed()) {
            if ((hours === 0 && minutes === 0) && (seconds === 0)) {
                let newHours = setTimeHours();
                let newMinutes = setTimeMinutes();
                let newSeconds = setTimeSeconds();
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
    },[seconds, quoteOfTheDayDate])

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

    const onPressFunction = quoteOfTheDayDate === "" || aDayHasPassed() ? handleRefreshPress : alertUser;

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

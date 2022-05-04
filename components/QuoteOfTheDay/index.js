import React, { useEffect, useState, useRef} from 'react';
import { Platform, Linking, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import Share from 'react-native-share';

import GlobalStyles from '../../config/GlobalStyles';

import Colors from '../../config/Colors';
const {whiteOpaque, backgroundGradientTopLeft, backgroundGradientTopRight} = Colors;

import QuoteCard from './QuoteCard';
import QuoteCardActions from './QuoteCardActions';
import getDailyQuote from '../../redux/actions/quoteActions/getDailyQuote';
import RefreshButton from './RefreshButton';
import favoriteQuote from '../../redux/actions/quoteActions/favoriteQuote';
import unfavoriteQuote from '../../redux/actions/quoteActions/unfavoriteQuote';

const QuoteOfTheDay = ({session, getDailyQuote, favoriteQuote, unfavoriteQuote }) => {

    const [isFavorited, setIsFavorited] = useState(false);

    const {dailyQuote, userInfo, favoriteQuotes} = session;

    const {username} = userInfo;

    const {quoteOfTheDayDate, quoteInfo} = dailyQuote;

    const opacityVal = useRef(new Animated.Value(0)).current;

    const [shareToIGStories, setShareToIGStories] = useState(false);

    const shareRef = useRef();
    

    const handleFetchQuote = () => {
        let dailyQuoteInfo = {
            username: username,
            quoteOfTheDayDate: quoteOfTheDayDate
        };
        getDailyQuote(dailyQuoteInfo);
        setIsFavorited(false);
    };

    const handleFavoritePress = () => {
        const {id} = quoteInfo;
        let favoriteInfo = {
            username: username,
            quoteId: id
        }
        if (!isFavorited) {
            favoriteQuote(favoriteInfo);
        } else {
            unfavoriteQuote(favoriteInfo);
        }
    }

    const checkIfFavorited = () => {
        if (favoriteQuotes.length > 0) {
            if (favoriteQuotes.some(quote => quote.id === quoteInfo.id)) {
                setIsFavorited(true);
            } else {
                setIsFavorited(false);
            }
        } else {
            setIsFavorited(false)
        }
    }

    const fadeIn = () => {
        Animated.timing(opacityVal, {
            toValue: 1,
            duration: 750,
            useNativeDriver: true
        }).start();
    };

    const checkIGStories = () => {
        Linking.canOpenURL('instagram://')
            .then(val => {
                console.log(val);
                setShareToIGStories(val);
            })
            .catch(error => console.log(error.message))
    }


    useEffect(() => {
        checkIfFavorited()
        checkIGStories();
        fadeIn()
    }, [favoriteQuotes.length]);

    const handleSharePress = async () => {
        try {
            const uri = await captureRef(shareRef, {
                format: 'png',
                quality: 0.8,
                height: 200,
                width: 300,
                result: 'tmpfile'
            });
            console.log("ref uri", uri);
            const encodedUrl = encodeURI(uri)
            console.log("Encoded url:", encodedUrl);
            // if (shareToIGStories) {
                await Linking.openURL(`instagram://library?AssetPath=${encodedUrl}`);
                // await Share.shareSingle({
                //     stickerImage: uri,
                //     method: Share.InstagramStories.SHARE_STICKER_IMAGE,
                //     social: Share.Social.INSTAGRAM_STORIES,
                //     backgroundBottomColor: backgroundGradientTopLeft[0],
                //     backgroundTopColor: backgroundGradientTopRight[1],
                // })
            // } else {
                // Share.share({url: uri})
            // }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Animated.View style={[styles.quoteOfTheDayContainer, {opacity: opacityVal}]}>
            {quoteOfTheDayDate === '' ?
                <TouchableOpacity style={styles.loadQuoteButton} onPress={handleFetchQuote}>
                    <Text>Load your first daily quote.</Text>
                </TouchableOpacity>
            :
            <>
                <RefreshButton handleRefreshPress={handleFetchQuote} />
                <QuoteCard shareRef={shareRef} />
                <QuoteCardActions shareToIGStories={shareToIGStories} handleSharePress={handleSharePress} isFavorited={isFavorited} handleFavoritePress={handleFavoritePress} />
            </>
            }
        </Animated.View>
    )
}

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
    loadQuoteButton: {
        padding: width * 0.05,
        backgroundColor: whiteOpaque,
        borderRadius: 10,
    },
    quoteOfTheDayContainer: {
        width: '80%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const mapStateToProps = state => {
    return {
        session: state.session,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDailyQuote: (dailyQuoteInfo) => dispatch(getDailyQuote(dailyQuoteInfo)),
        favoriteQuote: (favoriteInfo) => dispatch(favoriteQuote(favoriteInfo)),
        unfavoriteQuote: (unfavoriteInfo) => dispatch(unfavoriteQuote(unfavoriteInfo)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QuoteOfTheDay);
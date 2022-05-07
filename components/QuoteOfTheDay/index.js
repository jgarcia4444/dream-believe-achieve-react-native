import React, { useEffect, useState, useRef} from 'react';
import { Platform, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Alert } from 'react-native';
import { connect } from 'react-redux';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing'
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Linking from 'expo-linking';

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
                console.log("Share to ig stories: ", val);
                setShareToIGStories(val);
            })
    }


    useEffect(() => {
        checkIfFavorited()
        checkIGStories();
        fadeIn()
    }, [favoriteQuotes.length]);

    const sharePressed = async () => {
        var uri = ''
        const granted = await MediaLibrary.requestPermissionsAsync();
        if (granted) {
            let mediaAsset = await saveQuoteAsAsset();
            let assetUriParts = mediaAsset.uri.split('/');
            let assetName = assetUriParts[assetUriParts.length - 1];
            uri = `${FileSystem.documentDirectory}/${assetName}`;
            await FileSystem.copyAsync({
                from: mediaAsset.uri,
                to: uri
            });
            // if (shareToIGStories) {
                try {
                    let encodedUri = encodeURIComponent(uri);
                    Linking.openURL(`instagram://library?AssetPath=${encodedUri}`)
                    .catch(err => Sharing.shareAsync(uri))
                } catch (err) {
                    console.log("Error from attempting to share media.");
                }
        }
    }

    const saveQuoteAsAsset = async () => {
        var prefix = ''
        if (Platform.OS === 'android') {
            prefix = "file://";
        }
        try {
            let capturedRef = await captureRef(shareRef, {
                quality: 0.8,
                width: 300,
                height: 200,
            })
            let mediaAvailable = await MediaLibrary.isAvailableAsync();
            if (mediaAvailable) {
                let newAsset = await MediaLibrary.createAssetAsync(capturedRef);
                return newAsset;
            } else {
                // show alert that the user has not allowed permissions.
            }
        } catch (error) {
            console.log("Error saving quote as an asset", error)
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
                <QuoteCardActions shareToIGStories={shareToIGStories} handleSharePress={sharePressed} isFavorited={isFavorited} handleFavoritePress={handleFavoritePress} />
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
import React, { useEffect, useState, useRef} from 'react';
import { View, Platform, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Alert } from 'react-native';
import { connect } from 'react-redux';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing'
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Linking from 'expo-linking';
import {Feather} from 'react-native-vector-icons';

import GlobalStyles from '../../config/GlobalStyles';

import Colors from '../../config/Colors';
const {whiteOpaque, backgroundGradientTopLeft, backgroundGradientTopRight, black} = Colors;

import QuoteCard from './QuoteCard';
import QuoteCardActions from './QuoteCardActions';
import RefreshButton from './RefreshButton';
import Background from '../Background';

import getDailyQuote from '../../redux/actions/quoteActions/getDailyQuote';
import favoriteQuote from '../../redux/actions/quoteActions/favoriteQuote';
import unfavoriteQuote from '../../redux/actions/quoteActions/unfavoriteQuote';

const QuoteOfTheDay = ({session, getDailyQuote, favoriteQuote, unfavoriteQuote }) => {

    const [isFavorited, setIsFavorited] = useState(false);
    const [shareToIGStories, setShareToIGStories] = useState(false);
    const [capturingRef, setCapturingRef] = useState(false);

    const {dailyQuote, userInfo, favoriteQuotes} = session;
    const {username} = userInfo;
    const {quoteOfTheDayDate, quoteInfo} = dailyQuote;

    const opacityVal = useRef(new Animated.Value(0)).current;


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
                setShareToIGStories(val);
            })
    }


    useEffect(() => {
        checkIfFavorited()
        checkIGStories();
        fadeIn()
    }, [favoriteQuotes.length]);

    const sharePressed = async () => {
        setCapturingRef(true);
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
            try {
                let encodedUri = encodeURIComponent(uri);
                Linking.openURL(`instagram://library?AssetPath=${encodedUri}`)
                .catch(err => Sharing.shareAsync(uri))
            } catch (err) {
                console.log("Error from attempting to share media.");
            }
        }
    }

    const handleDownloadIOS = () => {
        Linking.openURL("https://apps.apple.com/us/app/dream-believe-achieve/id1531356264");
    }

    let shareAsset = (
        <View ref={shareRef} style={styles.shareAsset}>
            <Background />
            <View style={styles.shareAssetQuoteContainer}>
                <QuoteCard />
            </View>
            <View style={styles.shareAssetRow}>
                <Text style={styles.shareAssetText}>Dream Believe Achieve</Text>
            </View>
            <View>
                <View style={styles.arrowRow}>
                    <Feather name="arrow-up" size={32} color={black} />
                    <Feather name="arrow-up" size={32} color={black} />
                </View>
                <View style={styles.downloadDescription}>
                    <Text>Use the title above and search within your native app store to get inspirational quotes.</Text>
                </View>
            </View>
        </View>
    )

    const saveQuoteAsAsset = async () => {
        var prefix = ''
        if (Platform.OS === 'android') {
            prefix = "file://";
        }
        try {
            let capturedRef = await captureRef(shareRef, {
                quality: 0.8,
                width: width,
                height: height,
            })
            setCapturingRef(false);
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
            {capturingRef === true && shareAsset}
            {quoteOfTheDayDate === '' ?
                <TouchableOpacity style={styles.loadQuoteButton} onPress={handleFetchQuote}>
                    <Text>Load your first daily quote.</Text>
                </TouchableOpacity>
            :
            <>
                <RefreshButton handleRefreshPress={handleFetchQuote} />
                {/* <QuoteCard shareRef={shareRef} /> */}
                <QuoteCard />
                <QuoteCardActions shareToIGStories={shareToIGStories} handleSharePress={sharePressed} isFavorited={isFavorited} handleFavoritePress={handleFavoritePress} />
            </>
            }
        </Animated.View>
    )
}

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
    arrowRow: {
        width: width,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: height * 0.02,
    },
    downloadDescription: {
        width: width * 0.9,
        marginStart: width * 0.05,
    },
    loadQuoteButton: {
        padding: width * 0.05,
        backgroundColor: whiteOpaque,
        borderRadius: 10,
    },
    shareAsset: {
        height: height,
        width: width,
        margin: width * 0.02,
        alignItems: "center",
        justifyContent: "center",
    },
    shareAssetRow: {
        marginVertical: height * 0.02
    },
    shareAssetText: {
        fontSize: 24,
        fontWeight: "900",
        opacity: 0.75
    },
    shareAssetQuoteContainer: {
        width: width * 0.75,
        height: height * 0.5,
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
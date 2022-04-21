
const initialState = {
    userInfo: {
        userId: '',
        username: '',
        email: '',
    },
    userInfoLoading: false,
    loginError: '',
    signUpError: '',
    dailyQuote: {
        quoteOfTheDayDate: '',
        quoteInfo: {
            id: '',
            quote: '',
            author: ''
        },
        dailyQuoteLoading: false,
        dailyQuoteError: '',
    },
    favoriteQuotes: [],
    fetchingFavorites: false,
    fetchingFavoritesError: "",
    quoteFavoriting: false,
    quoteFavoritingError: "",
    topTenQuotes: []
};

const formatDateString = (dateString) => {
    let stringSplit = dateString.split(" ");
    return `${stringSplit[0]}T${stringSplit[1]}${stringSplit[2]}`;
}

const sessionReducer = (state=initialState, action) => {
    switch(action.type) {
        case "UNFAVORITE_QUOTE_SUCCESS":
            let removedFavorites = state.favoriteQuotes.filter(quote => quote.id !== action.removedQuoteId);
            return {
                ...state,
                quoteFavoriting: false,
                quoteFavoritingError: "",
                favoriteQuotes: removedFavorites
            }
        case "UNFAVORITE_QUOTE_ERROR": 
            return {
                ...state,
                quoteFavoriting: false,
                quoteFavoritingError: action.errorMessage 
            }
        case "FAVORITING_QUOTE":
            return {
                ...state,
                quoteFavoriting: true,
                quoteFavoritingError: ""
            }
        case "FAVORITE_QUOTE_ERROR":
            return {
                ...state,
                quoteFavoriting: false,
                quoteFavoritingError: action.errorMessage   
            }
        case "FAVORITE_QUOTE_SUCCESS":
        let addedFavorites = state.favoriteQuotes.concat(action.newFavorite)
        return {
            ...state,
            quoteFavoriting: false,
            quoteFavoritingError: "",
            favoriteQuotes: addedFavorites,
        }
        case "FAVORITES_FETCH_SUCCESS":
            return {
                ...state,
                fetchingFavorites: false,
                fetchingFavoritesError: '',
                favoriteQuotes: action.favoriteQuotes,
                topTenQuotes: action.topTenQuotes,
            }
        case "FAVORITES_FETCH_ERROR":
            return {
                ...state,
                fetchingFavorites: false,
                fetchingFavoritesError: action.errorMessage
            }
        case "FETCHING_FAVORITES":
            return {
                ...state,
                fetchingFavorites: true,
                fetchingFavoritesError: ""
            }
        case "DAILY_QUOTE_FETCH_SUCCESS":
            let {dailyQuote} = action;
            let formattedDate = formatDateString(dailyQuote.quoteOfTheDayDate)
            return {
                ...state,
                dailyQuote: {
                    ...state.dailyQuote,
                    ...dailyQuote,
                    dailyQuoteError: '',
                    dailyQuoteLoading: false,
                    quoteInfo: {
                        ...state.dailyQuote.quoteInfo,
                        ...dailyQuote.quoteInfo
                    },
                    quoteOfTheDayDate: formattedDate
                }
            }
        case "DAILY_QUOTE_FETCH_ERROR":
            return {
                ...state,
                dailyQuote: {
                    ...state.dailyQuote,
                    dailyQuoteLoading: false,
                    dailyQuoteError: action.errorMessage
                }
            }
        case "FETCHING_DAILY_QUOTE":
            return {
                ...state,
                dailyQuote: {
                    ...state.dailyQuote,
                    dailyQuoteLoading: true,
                    dailyQuoteError: ''
                }
            }
        case "USER_SIGN_OUT":
            return {
                ...initialState
            }
        case 'CREATING_USER':
            return {
                ...state,
                userInfoLoading: true,
                signUpError: ''
            }
        case 'USER_CREATION_SUCCESS':
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    ...action.userInfo
                },
                userInfoLoading: false,
                signUpError: '',
                topTenQuotes: action.topTenQuotes
            }
        case 'USER_CREATION_ERROR':
            return {
                ...state,
                userInfoLoading: false,
                signUpError: action.errorMessage
            }
        case 'USER_LOGGING_IN':
            return {
                ...state,
                userInfoLoading: true,
                loginError: ''
            }
        case 'USER_LOGIN_SUCCESS':
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    ...action.userInfo
                },
                userInfoLoading: false,
                loginError: '',
                dailyQuote: {
                    ...state.dailyQuote,
                    ...action.dailyQuote,
                    quoteOfTheDayDate: formatDateString(action.dailyQuote.quoteOfTheDayDate)
                },
                favoriteQuotes: action.favoriteQuotes,
                topTenQuotes: action.topTenQuotes
            }
        case 'USER_LOGIN_ERROR':
            return {
                ...state,
                userInfo: {
                    ...state.userInfo
                },
                userInfoLoading: false,
                loginError: action.errorMessage
            }
        case "persist/REHYDRATE":
            if (action.payload) {
                return {
                    ...state,
                    ...action.payload.session,
                }
            } else {
                return {
                    ...state
                }
            }
        default:
            return {
                ...state
            }
    }
}

export default sessionReducer;

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
    quoteFavoritingError: ""
};

const sessionReducer = (state=initialState, action) => {
    switch(action.type) {
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
                signUpError: ''
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
                loginError: ''
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
            return {
                ...state,
                ...action.payload.session,
            }
        default:
            return {
                ...state
            }
    }
}

export default sessionReducer;
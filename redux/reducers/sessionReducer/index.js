
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
    favoriteQuotes: []
};

const sessionReducer = (state=initialState, action) => {
    switch(action.type) {
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
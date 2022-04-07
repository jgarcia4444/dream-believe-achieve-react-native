
const initialState = {
    userInfo: {
        userId: '',
        username: '',
        email: '',
    },
    userInfoLoading: false,
    loginError: '',
    signUpError: '',
};

const sessionReducer = (state=initialState, action) => {
    switch(action.type) {
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
        default:
            return {
                ...state
            }
    }
}

export default sessionReducer;
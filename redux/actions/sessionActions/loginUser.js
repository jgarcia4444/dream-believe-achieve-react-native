import Urls from "../../../config/Urls";
const {baseUrl} = Urls;

const loginUser = (loginInfo) => {
    
    const url = `${baseUrl}/users/login`;

    const configuredBody = {
        login_info: {
            email: loginInfo.email,
            password: loginInfo.password
        }
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(configuredBody)
    };

    return async dispatch => {
        dispatch({type: "USER_LOGGING_IN"});
        fetch(url, options)
            .then(res => {
                return res.json()
            })
            .then(data => {
                let {error} = data;
                let {hasError} = error;
                if (hasError === true) {
                    var formErrors;
                    let {message} = error;
                    if (error.errors) {
                        formErrors = error.errors;
                    }
                    return dispatch({type: "USER_LOGIN_ERROR", errorMessage: message, formErrors});
                } else {
                    let {userInfo, dailyQuote, favoriteQuotes, topTenQuotes} = data;
                    return dispatch({type: "USER_LOGIN_SUCCESS", userInfo, dailyQuote, favoriteQuotes, topTenQuotes});
                }
            })
    }
} 

export default loginUser;
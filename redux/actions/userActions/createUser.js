import Urls from '../../../config/Urls';
const {baseUrl} = Urls;

const createUser = (userInfo) => {
    let url = `${baseUrl}/users`;
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user: userInfo})
    };
    return async dispatch => {
        dispatch({type: "CREATING_USER"});
        fetch(url, options)
            .then(res => res.json())
            .then(data => {
                let {error} = data;
                let {hasError} = error;
                if (hasError === true) {
                    let {message} = error;
                    let errors = []
                    if (error.errors) {
                        errors = error.errors;
                    }
                    return dispatch({type: "USER_CREATION_ERROR", errorMessage: message, errors});
                } else {
                    let {userInfo, topTenQuotes} = data;
                    return dispatch({type: "USER_CREATION_SUCCESS", userInfo, topTenQuotes})
                }
            })
    }
}

export default createUser;
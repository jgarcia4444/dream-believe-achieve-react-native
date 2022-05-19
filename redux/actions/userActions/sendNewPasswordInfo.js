import Urls from '../../../config/Urls';
const { baseUrl } = Urls;

const sendNewPasswordInfo = (passwordInfo) => {

    const url = `${baseUrl}/users/change-password`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(passwordInfo)
    };

    return async dispatch => {

        dispatch({type: "CHANGING_PASSWORD"});

        fetch(url, options)
            .then(res => res.json())
            .then(data => {
                let { error } = data;
                let { hasError } = error;
                if (hasError === true) {
                    let { message, errorType } = error;
                    return dispatch({type: "PASSWORD_CHANGE_ERROR", errorMessage: message, errorType});
                } else {
                    return dispatch({type: "PASSWORD_CHANGE_SUCCESS"});
                }
            })

    }

}

export default sendNewPasswordInfo
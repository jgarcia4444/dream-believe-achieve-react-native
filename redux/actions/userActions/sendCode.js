import Urls from "../../../config/Urls";
const { baseUrl } = Urls;

const sendCode = (email) => {

    const url = `${baseUrl}/users/send-code`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email
        })
    }

    return async dispatch => {

        dispatch({type: 'SENDING_CODE'});

        fetch(url, options)
            .then(res => res.json())
            .then(data => {
                let {error} = data;
                let {hasError} = error;
                if (hasError === true) {
                    let {message} = error;
                    return dispatch({type: "CODE_SEND_ERROR", errorMessage: message});
                } else {
                    let {email} = data;
                    return dispatch({type: "CODE_SEND_SUCCESS", email: email});
                }
            })
    }
}

export default sendCode;
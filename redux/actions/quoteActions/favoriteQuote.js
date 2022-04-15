import Urls from "../../../config/Urls";
const {baseUrl} = Urls;

const favoriteQuote = (quoteInfo) => {
    const {username, quoteId} = quoteInfo;

    let bodyObject = {
        favorite_quote_info: {
            id: quoteId
        }
    }

    const url = `${baseUrl}/users/${username}/favorites/add`;

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObject)
    }

    return async dispatch => {
        dispatch({type: "FAVORITING_QUOTE"});

        fetch(url, options)
            .then(res => res.json())
            .then(data => {
                let {error} = data;
                let {hasError} = error;
                if (hasError === true) {
                    let {message} = error;
                    return dispatch({type: "FAVORITE_QUOTE_ERROR", errorMessage: message});
                } else {
                    let {newFavorite} = data;
                    return dispatch({type: "FAVORITE_QUOTE_SUCCESS", newFavorite});
                }
            })
        }

}

export default favoriteQuote;
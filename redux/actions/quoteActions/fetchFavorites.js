import Urls from '../../../config/Urls';
const {baseUrl} = Urls;

const fetchFavorites = (username) => {

    const url = `${baseUrl}/users/${username}/favorites`;

    return async dispatch => {
        dispatch({type: "FETCHING_FAVORITES"});

        fetch(url)
            .then(res => res.json())
            .then(data => {
                let {error} = data;
                let {hasError} = error;
                if (hasError === true) {
                    let {message} = error;
                    return dispatch({type: "FAVORITES_FETCH_ERROR", errorMessage: message});
                } else {
                    let {favoriteQuotes} = data;
                    return dispatch({type: "FAVORITES_FETCH_SUCCESS", favoriteQuotes});
                }
            })
            .catch(e => console.log("Error from fetch favorites: ", e))
    }

}

export default fetchFavorites;
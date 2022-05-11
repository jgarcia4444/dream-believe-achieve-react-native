import Urls from "../../../config/Urls";
const { baseUrl } = Urls;

const fetchTopTenQuotes = () => {

    const url = `${baseUrl}/top-ten-quotes`;

    return async dispatch => {
        dispatch({type: "TOP_TEN_QUOTES_LOADING"});

        fetch(url)
            .then(res => res.json())
            .then(data => {
                let {error} = data;
                let {hasError} = error;
                if (hasError) {
                    let {message} = error;
                    dispatch({type: "TOP_TEN_QUOTES_LOAD_FAILED", errorMessage: message})
                } else {
                    let {topTenQuotes} = data;
                    dispatch({type: "TOP_TEN_QUOTES_LOAD_SUCCESS", topTenQuotes});
                }
            })
    }
};

export default fetchTopTenQuotes;
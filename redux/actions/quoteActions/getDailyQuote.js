
import Urls from '../../../config/Urls';
const {baseUrl} = Urls;

const getDailyQuote = (dailyQuoteInfo) => {

    const url = `${baseUrl}/quotes/get-daily-quote`;

    const configuredBody = {
        user_info: {
            username: dailyQuoteInfo.username,
            quote_of_the_day_date: dailyQuoteInfo.quoteOfTheDayDate
        }
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(configuredBody)
    };

    return async dispatch => {
        dispatch({type: "FETCHING_DAILY_QUOTE"})

        fetch(url, options)
            .then(res => res.json())
            .then(data => {
                console.log("Here is random quote data", data);
                let {error} = data;
                let {hasError} = error;
                if (hasError === true) {
                    let {message} = error;
                    return dispatch({type: "DAILY_QUOTE_FETCH_ERROR", errorMessage: message});
                } else {
                    let {dailyQuote} = data;
                    return dispatch({type: "DAILY_QUOTE_FETCH_SUCCESS", dailyQuote});
                }
            })
    }

}

export default getDailyQuote;
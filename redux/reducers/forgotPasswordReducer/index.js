
const initialState = {
    email: '',
    sendingCode: false,
    codeError: '',
}

const forgotPasswordReducer = (state=initialState, action) => {
    switch (action.type) {
        case "SENDING_CODE":
            return {
                ...state,
                sendingCode: true,
                codeError: ''
            }
        case "CODE_SEND_SUCCESS":
            return {
                ...state,
                sendingCode: false,
                codeError: '',
                email: action.email
            }
        case "CODE_SEND_ERROR":
            return {
                ...state,
                sendingCode: false,
                codeError: action.errorMessage
            }
        default:
            return {
                ...state
            }
    }
}

export default forgotPasswordReducer
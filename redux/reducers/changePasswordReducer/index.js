const initialState = {
    oldPasswordError: "",
    changingPassword: false,
    newPasswordError: "",
    passwordChangeSuccess: false,
};

const changePasswordReducer = (state=initialState, action) => {
    switch(action.type) {
        case "NEW_PASSWORD_EMPTY":
            return {
                ...state,
                changingPassword: false,
                newPasswordError: "New password can not be left empty",
            }
        case "PASSWORD_EMPTY":
            return {
                ...state,
                changingPassword: false,
                oldPasswordError: "Password can not be left empty",
            }
        case "CHANGING_PASSWORD":
            return {
                ...state,
                changingPassword: true,
                oldPasswordError: "",
                newPasswordError: ""
            }
        case "PASSWORD_CHANGE_ERROR":
            let {errorType} = action;
            if (errorType === "password") {
                return {
                    ...state,
                    changingPassword: false,
                    oldPasswordError: action.errorMessage,
                    newPasswordError: ""
                }
            } else {
                return {
                    ...state,
                    changingPassword: false,
                    oldPasswordError: "",
                    newPasswordError: action.errorMessage,
                }
            }
        case "PASSWORD_CHANGE_SUCCESS":
            return {
                ...initialState,
                passwordChangeSuccess: true
            }
        case "REMOVE_SUCCESS_MODAL":
            return {
                ...state,
                passwordChangeSuccess: false
            }
        default:
            return {
                ...state
            }
    }
}

export default changePasswordReducer;
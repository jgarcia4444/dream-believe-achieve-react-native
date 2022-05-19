import { combineReducers } from "redux";

import sessionReducer from './sessionReducer';
import forgotPasswordReducer from "./forgotPasswordReducer";
import changePasswordReducer from './changePasswordReducer';

const rootReducer = combineReducers({
    session: sessionReducer,
    forgotPassword: forgotPasswordReducer,
    changePassword: changePasswordReducer,
});

export default rootReducer
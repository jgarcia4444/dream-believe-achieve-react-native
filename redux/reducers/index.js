import { combineReducers } from "redux";

import sessionReducer from './sessionReducer';
import forgotPasswordReducer from "./forgotPasswordReducer";

const rootReducer = combineReducers({
    session: sessionReducer,
    forgotPassword: forgotPasswordReducer
});

export default rootReducer
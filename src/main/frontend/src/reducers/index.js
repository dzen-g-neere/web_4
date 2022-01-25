import signInReducer from "./userSignedInReducer"
import xReducer from "./reducerX"
import yReducer from "./reducerY"
import rReducer from "./reducerR"
import pointsReducer from "./pointsReducer"
import wantToRegReducer from "./userNeedToSignUpReducer";
import userCredentialsReducer from "./userCredentialsReducer";
import {combineReducers} from "redux"
import messageReducer from "./messageReducer";

const combinedReducer = combineReducers({
    isSignedIn: signInReducer,
    X: xReducer,
    Y: yReducer,
    R: rReducer,
    points: pointsReducer,
    userNeedToSignUp: wantToRegReducer,
    userCredentials: userCredentialsReducer,
    message: messageReducer
})

export default combinedReducer;
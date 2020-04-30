import { LOGIN, LOG_OUT, SUCCESS_SIGN_UP } from '../actions/types';

const INITAL_STATE = {
    isSignIn: null,
    successSignUpMessage: null
}
export default (state = INITAL_STATE, action) => {
    switch(action.type) {
        case LOGIN:
            if (action.payload){
                return { isSignIn: true }
            }
            return state;
        case LOG_OUT:
            return { ...state, isSignIn: false }
        case SUCCESS_SIGN_UP:
            return {...state, successSignUpMessage: "you were registered successfuly"}
        default:
            return state;
    }
}
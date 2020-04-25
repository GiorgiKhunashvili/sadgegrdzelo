import { LOGIN, SIGN_UP, LOG_OUT } from '../actions/types';

const INITAL_STATE = {
    isSignIn: null,
}
export default (state = INITAL_STATE, action) => {
    switch(action.type) {
        case LOGIN:
            if (action.payload){
                return { isSignIn: true }
            }
            return state;
        case LOG_OUT:
            return { isSignIn: false }
        default:
            return state;
    }
}
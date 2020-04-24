import { LOGIN, SIGN_UP } from '../actions/types';

const INITAL_STATE = {
    isSignIn: null,
    emailError: null,
    usernameError: null,

}
export default (state = INITAL_STATE, action) => {
    switch(action.type) {
        case LOGIN:
            if (action.payload){
                return { isSignIn: true }
            }
            return state;
        case SIGN_UP:
            if (action.payload.status === 400){
                return {...state, emailError: action.payload.data.email[0]}
            }
        default:
            return state;
    }
}
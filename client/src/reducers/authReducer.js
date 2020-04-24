import { LOGIN, SIGN_UP } from '../actions/types';

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
        case SIGN_UP:
            return state;
        default:
            return state;
    }
}
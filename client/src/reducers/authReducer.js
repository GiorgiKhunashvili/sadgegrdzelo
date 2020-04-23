import { LOGIN } from '../actions/types';

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
        default:
            return state;
    }
}
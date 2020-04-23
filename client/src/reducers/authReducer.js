import { LOGIN } from '../actions/types';

const INITAL_STATE = {
    isSignIn: null,
    userToken: null,
    refreshToken: null,
}
export default (state = INITAL_STATE, action) => {
    switch(action.type) {
        case LOGIN:
            return { ...state, userToken: action.payload.userToken, refreshToken: action.payload.refreshToken}
    }
}
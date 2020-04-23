import { LOGIN } from './types';
export const login = (userToken, refreshToken) => {
    return {
        type: LOGIN,
        payload: {
            userToken,
            refreshToken
        }
    }
}
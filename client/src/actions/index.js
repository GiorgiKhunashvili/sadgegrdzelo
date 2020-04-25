import { LOGIN, SIGN_UP } from './types';
import axiosInstance from '../axiosApi/api';
import { SubmissionError } from 'redux-form';

export const login = (formValues) => {
    return async (dispatch) => {
        let isSignIn = false;
        try {
            const response = await axiosInstance.post('/token/obtain/', {...formValues});
            axiosInstance.defaults.headers['Authorization'] = "JWT" + response.data.access;
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            isSignIn = true;
            dispatch({
                type: LOGIN,
                payload: isSignIn
            })
    } catch {

    }
    }
}
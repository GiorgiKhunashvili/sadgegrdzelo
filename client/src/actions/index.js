import { LOGIN, SIGN_UP, LOG_OUT } from './types';
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

export const logout = () => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post('/blacklist/', {
                "refresh_token": localStorage.getItem('refresh_token')
            });
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            axiosInstance.defaults.headers['Authorization'] = null;
            dispatch({
                type: LOG_OUT
            })

        }catch(e) {
            console.log(e)
        }
    }
}
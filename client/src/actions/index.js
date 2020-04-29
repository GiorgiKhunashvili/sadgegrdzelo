import { LOGIN,
        LOG_OUT,
        SUCCESS_SIGN_UP,
        CHANGE_RECORD_BUTTON
     } from './types';
import axiosInstance from '../axiosApi/api';
import { SubmissionError } from 'redux-form';
import history from '../history';

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
            history.push('/')
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
            console.log(response)
            dispatch({
                type: LOG_OUT
            })

            history.push('/')
            return response
        }catch(e) {
            console.log(e)
        }
    }
}


export const succesSingUp = () => {
    return {
        type: SUCCESS_SIGN_UP
    }
}

export const changeRecordButton = (recording) => {
    return {
        type: CHANGE_RECORD_BUTTON,
        payload: {
            recording: recording
        }
    }
}
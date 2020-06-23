import {
    LOGIN,
    LOG_OUT,
    SUCCESS_SIGN_UP,
    CREATE_SAD,
    GET_ALL_SADGEGRDZELO
} from './types';
import axiosInstance from '../axiosApi/api';

import history from '../history';

var formData = new FormData();

export const login = (formValues) => {
    return async (dispatch) => {
        let isSignIn = false;
        try {
            const response = await axiosInstance.post('/api/token/obtain/', { ...formValues });
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
            const response = await axiosInstance.post('/api/blacklist/', {
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
        } catch (e) {
            console.log(e)
        }
    }
}


export const succesSingUp = () => {
    return {
        type: SUCCESS_SIGN_UP
    }
}

export const createSadAction = (audioFile, formValues) => {
    return async (dispatch) => {
        try {
            formData.append('audio', audioFile);
            formData.append('title', formValues.title);
            formData.append('description', formValues.description);
            formData.append('id', 2);
            await axiosInstance.post('/sad/create/', formData, {
                headers: {
                    'Authorization': "JWT " + localStorage.getItem('access_token'),
                    'Content-Type': 'multipart/form-data'
                }
            });
            dispatch({
                type: CREATE_SAD,
            })
            history.push("/")

        } catch (e) {
            console.log(e.response)
        }
    }
}


export const getSadgegrdzeloData = () => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get('/sad/all-sadgegrdzelo/');
            dispatch({
                type: GET_ALL_SADGEGRDZELO,
                payload: response.data
            })

        } catch (e) {
            console.log(e.response);
        }
    }
}

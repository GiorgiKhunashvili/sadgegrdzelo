import { CREATE_SAD } from '../actions/types';

const INITAL_STATE = {
    recording: false,
    recordedTime: 0,
}

export default (state = INITAL_STATE, action) => {
    switch(action.type){
        case CREATE_SAD:
            return state;
        default:
            return state;
    }
}
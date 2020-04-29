import { CHANGE_RECORD_BUTTON, COUNT_RECORDING_TIME } from '../actions/types';

const INITAL_STATE = {
    recording: false,
    recordedTime: 0,
}

export default (state = INITAL_STATE, action) => {
    switch(action.type){
        case CHANGE_RECORD_BUTTON:
            if (action.payload.recording === true){
                return {...state, recording: true}
            }else {
                return {...state, recording: false}
            }
        case COUNT_RECORDING_TIME:
            return {...state, recordedTime: action.payload.time}
        default:
            return state;
    }
}
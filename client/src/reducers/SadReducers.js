import { CHANGE_RECORD_BUTTON } from '../actions/types';

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
        default:
            return state;
    }
}
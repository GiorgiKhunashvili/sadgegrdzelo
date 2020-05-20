import {
    RECODING,
    RECOREDED_TIME,
    IS_BLOCKED,
    BLOB_URL,
    AUDIO_FILE
}
from "../actions/types";


const INITAL_STATE = {
    recording: false,
    recordedTime: 0,
    isBlocked: true,
    blobURL: "",
    file: null
}

export default (state = INITAL_STATE, action) => {
    switch(action.type){
        case RECODING:
            return { ...state, recording: action.payload }
        case RECOREDED_TIME:
            return { ...state, recordedTime: action.payload }
        case IS_BLOCKED:
            return { ...state, isBlocked: action.payload }
        case BLOB_URL:
            return { ...state, BLOB_URL: action.payload }
        case AUDIO_FILE:
            return { ...state, AUDIO_FILE: action.payload }
        default:
            return state;
    }
}
import { RECORDING, RECOREDED_TIME, IS_BLOCKED, BLOB_URL, AUDIO_FILE } from './types';

export const recordingActon = ( recording ) => {
    return {
        type: RECORDING,
        payload: recording
    }
}

export const recordedTimeAction = ( recorededTime ) => {
    return {
        type: RECOREDED_TIME,
        payload: recorededTime
    }
}

export const isBlockedAction = ( isBlocked ) => {
    return {
        type: IS_BLOCKED,
        payload: isBlocked
    }
}

export const blobURLAction = ( blobURL ) => {
    return {
        type: BLOB_URL,
        payload: blobURL
    }
}

export const audioFileAction = ( file ) => {
    return {
        type: AUDIO_FILE,
        payload: file
    }
}
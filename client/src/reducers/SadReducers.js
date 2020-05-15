import { CREATE_SAD, GET_ALL_SADGEGRDZELO } from '../actions/types';

const INITAL_STATE = {
    allSad: []
}

export default (state = INITAL_STATE, action) => {
    switch(action.type){
        case CREATE_SAD:
            return state;
        case GET_ALL_SADGEGRDZELO:
            return {...state, allSad: action.payload}
        default:
            return state;
    }
}
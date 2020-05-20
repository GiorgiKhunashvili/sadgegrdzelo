import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import sadReducers from './SadReducers';
import recordAudioReducers from './RecordAudioReducers';

export default combineReducers({
    form: formReducer,
    auth: authReducer,
    sad: sadReducers,
    recordAudio: recordAudioReducers
})
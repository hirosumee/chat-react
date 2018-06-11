import auth from './reducers/auth';
import message from './reducers/message';
import { combineReducers } from 'redux';
export default combineReducers({auth,message});
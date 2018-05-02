import { combineReducers } from 'redux';
import schedule from './scheduleReducer';
import user from './userReducer';
import login from './loginReducer';

const store = combineReducers({
  user,
  login,
  schedule,
});

export default store;

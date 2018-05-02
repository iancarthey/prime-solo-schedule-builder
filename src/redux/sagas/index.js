import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import scheduleSaga from './scheduleSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    scheduleSaga()
    // watchIncrementAsync()
  ]);
}

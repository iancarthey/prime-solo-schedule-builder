import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* scheduleSaga(){
    yield takeEvery('FETCH_SCHEDULE_GROUP', getGroupSaga);
    yield takeEvery('ADD_SCHEDULE_ITEM', addScheduleItemSaga);
}

//GET request for schedule groups
function* getGroupSaga(action){
    try{
        // create variable to make request to router
        const groupResponse = yield call(axios.get, '/api/group');

        //dispatch new action to set Reducer
        yield put({
            type: 'SET_SCHEDULE_GROUP',
            payload: groupResponse.data 
        })
    } catch(error){
        console.log('error in GETGROUPSAGA: ', error)
    }
}

//POST REQUEST FOR SCHEDULE ITEMS
function* addScheduleItemSaga(action){
    try{
        yield call(axios.post, '/api/item', action.payload)
        yield put({
            type: 'FETCH_SCHEDULE_ITEM'
        })
    } catch(error){
        console.log('error in ADDSCHEDULEITEM SAGA: ', error)
    }
}

export default scheduleSaga;
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* scheduleSaga(){
    yield takeEvery('FETCH_SCHEDULE_GROUP', getGroupSaga);
    yield takeEvery('ADD_SCHEDULE', addScheduleSaga);
    yield takeEvery('ADD_SCHEDULE_GROUP', addScheduleGroupSaga);
    yield takeEvery('FETCH_SCHEDULE', getScheduleSaga);
    yield takeEvery('DELETE_SCHEDULE', deleteScheduleSaga);
    yield takeEvery('VIEW_SCHEDULE', viewScheduleSaga);
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

//POST REQUEST FOR SCHEDULE
function* addScheduleSaga(action){
    try{
        yield call(axios.post, '/api/schedule', action.payload)
        yield put({
            type: 'FETCH_SCHEDULE'
        })
    } catch(error){
        console.log('error in ADDSCHEDULEITEM SAGA: ', error);
    }
}

//POST REQUEST FOR SCHEDULE GROUPS
function* addScheduleGroupSaga(action){
    try{
        yield call(axios.post, '/api/group', action.payload)
        yield put({
            type: 'FETCH_SCHEDULE_GROUP'
        })
    } catch(error){
        console.log('error in ADDSCHEDULEGROUP SAGA: ', error);
    }
}

//GET REQUEST FOR SCHEDULES
function* getScheduleSaga(action){
    try{
        //create variable for schedule get request
        const scheduleResponse = yield call(axios.get, '/api/schedule');

        //dispatch new action to set reducer
        yield put({
            type: 'SET_SCHEDULE',
            payload: scheduleResponse.data
        })
    } catch(error){
        console.log('error in GETSCHEDULE SAGA: ', error);
    }
}

//DELETE REQUEST FOR SCHEDULES
function* deleteScheduleSaga(action){
    try{
        //dispatch axios request to delete schedule from database
        yield call(axios.delete, `/api/schedule/${action.payload.id}`)

        //dispatch new action to get current schedules
        yield put({
            type: 'FETCH_SCHEDULE',
        })

    } catch (error){
        console.log('error in DELETESCHEDULE SAGA: ', error);
    }
}

//FUNCTION TO GET DESIRED SCHEDULE
function* viewScheduleSaga(action){
    try{
        //dispatch axios to get desired schedule to edit
    } catch (error){
        console.log('error in VIEW SCHEDULE SAGA: ', error)
    }
}

export default scheduleSaga;
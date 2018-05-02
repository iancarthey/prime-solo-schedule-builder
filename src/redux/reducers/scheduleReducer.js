import { combineReducers } from 'redux';

//reducer for storing schedule groups
const scheduleGroupReducer = (state = [], action) => {
    switch(action.type){
        case 'SET_SCHEDULE_GROUP':
            console.log(action.payload)
            return action.payload;
        default:
            return state;
    }
}

const scheduleItemReducer = (state = [], action) => {
    switch(action.type){
        case 'SET_SCHEDULE_ITEM':
            return [ ...state, action.payload];
        case 'UPDATE_SCHEDULE':
            return action.payload;
        default: 
            return state;
    }
}

export default combineReducers({
    scheduleGroupReducer,
    scheduleItemReducer
});
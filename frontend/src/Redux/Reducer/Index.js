import { combineReducers } from "redux";
import UserReducer from './UserReducer'

const reducers = combineReducers({
    userData:UserReducer,
});

export default reducers;
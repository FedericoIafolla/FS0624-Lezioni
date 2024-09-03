// src/redux/reducers/rootReducer.js
import { combineReducers } from 'redux';
import favouritesReducer from './favouritesReducer';
import jobsReducer from './jobsReducer';

const rootReducer = combineReducers({
    favourites: favouritesReducer,
    jobs: jobsReducer
});

export default rootReducer;

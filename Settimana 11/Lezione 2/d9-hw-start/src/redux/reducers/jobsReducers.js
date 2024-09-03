// src/redux/reducers/jobsReducer.js
import { FETCH_JOBS_REQUEST, FETCH_JOBS_SUCCESS, FETCH_JOBS_FAILURE } from '../actions/actionTypes';

const initialState = {
    jobs: [],
    loading: false,
    error: null
};

const jobsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_JOBS_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_JOBS_SUCCESS:
            return { ...state, jobs: action.payload, loading: false };
        case FETCH_JOBS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default jobsReducer;

// src/redux/actions/jobsActions.js
import { FETCH_JOBS_REQUEST, FETCH_JOBS_SUCCESS, FETCH_JOBS_FAILURE } from './actionTypes';

export const fetchJobsRequest = () => ({
    type: FETCH_JOBS_REQUEST,
});

export const fetchJobsSuccess = (jobs) => ({
    type: FETCH_JOBS_SUCCESS,
    payload: jobs,
});

export const fetchJobsFailure = (error) => ({
    type: FETCH_JOBS_FAILURE,
    payload: error,
});

export const fetchJobs = (company) => {
    return async (dispatch) => {
        dispatch(fetchJobsRequest());
        try {
            const response = await fetch(`https://strive-benchmark.herokuapp.com/api/jobs?company=${company}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const { data } = await response.json();
            dispatch(fetchJobsSuccess(data));
        } catch (error) {
            dispatch(fetchJobsFailure(error.message));
        }
    };
};

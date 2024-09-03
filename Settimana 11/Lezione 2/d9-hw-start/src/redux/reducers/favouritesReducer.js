// src/redux/reducers/favouritesReducer.js
import { ADD_FAVOURITE, REMOVE_FAVOURITE } from '../actions/actionTypes';

const initialState = [];

const favouritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FAVOURITE:
            // Check if the company is already in favourites to avoid duplicates
            if (state.includes(action.payload)) {
                return state;
            }
            return [...state, action.payload];
        case REMOVE_FAVOURITE:
            return state.filter((company) => company !== action.payload);
        default:
            return state;
    }
};

export default favouritesReducer;

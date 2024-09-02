
import { ADD_FAVOURITE, REMOVE_FAVOURITE } from "../actions/favouritesActions";

const initialState = [];

const favouritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FAVOURITE:
            return [...state, action.payload];
        case REMOVE_FAVOURITE:
            return state.filter((company) => company !== action.payload);
        default:
            return state;
    }
};

export default favouritesReducer;

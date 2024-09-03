// src/redux/actions/favouritesActions.js
import { ADD_FAVOURITE, REMOVE_FAVOURITE } from './actionTypes';

export const addFavourite = (companyName) => ({
    type: ADD_FAVOURITE,
    payload: companyName,
});

export const removeFavourite = (companyName) => ({
    type: REMOVE_FAVOURITE,
    payload: companyName,
});

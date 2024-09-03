
export const ADD_FAVOURITE = "ADD_FAVOURITE";
export const REMOVE_FAVOURITE = "REMOVE_FAVOURITE";

export const addFavourite = (companyName) => ({
    type: ADD_FAVOURITE,
    payload: companyName,
});

export const removeFavourite = (companyName) => ({
    type: REMOVE_FAVOURITE,
    payload: companyName,
});

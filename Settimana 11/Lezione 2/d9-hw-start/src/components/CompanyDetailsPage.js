import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavourite, removeFavourite } from '../redux/actions/favouritesActions';

const CompanyDetailsPage = () => {
    const { company } = useParams();
    const dispatch = useDispatch();
    const favourites = useSelector((state) => state.favourites);

    const isFavourite = favourites.includes(company);

    const handleAddFavourite = () => {
        if (!isFavourite) {
            dispatch(addFavourite(company));
        }
    };

    const handleRemoveFavourite = () => {
        if (isFavourite) {
            dispatch(removeFavourite(company));
        }
    };

    return (
        <div>
            <h2>Details for {company}</h2>
            {isFavourite ? (
                <button onClick={handleRemoveFavourite}>Remove from Favourites</button>
            ) : (
                <button onClick={handleAddFavourite}>Add to Favourites</button>
            )}
        </div>
    );
};

export default CompanyDetailsPage;

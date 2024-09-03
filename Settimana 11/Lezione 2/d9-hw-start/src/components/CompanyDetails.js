import React from 'react';
import { connect } from 'react-redux';
import { addFavourite } from '../redux/actions/favouritesActions';

const CompanyDetails = ({ company, addFavourite }) => {
    return (
        <div>
            <h2>{company.name}</h2>
            <button onClick={() => addFavourite(company.name)}>Add to Favourites</button>
        </div>
    );
};

export default connect(null, { addFavourite })(CompanyDetails);

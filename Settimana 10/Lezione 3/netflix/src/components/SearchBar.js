import React from 'react';
import { useLocation } from 'react-router-dom';

function SearchBar() {
    const location = useLocation(); // Ottieni la location corrente

    const placeholder = location.pathname === '/tv-shows' ? 'Cerca Serie TV...' : 'Cerca Film...';

    return (
        <input type="text" placeholder={placeholder} className="form-control" />
    );
}

export default SearchBar;

// SearchBar.js
import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (onSearch) {
            onSearch(searchTerm);
        }
    };

    return (
        <div className="search-bar">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search for a location..."
                    value={searchTerm}
                    onChange={handleChange}
                />
                <button type="submit" className="btn btn-primary">
                    <i className="fas fa-search" />
                </button>
            </form>
        </div>
    );
}

export default SearchBar;

import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        if (onSearch) {
            onSearch(event.target.value);
        }
    };

    return (
        <div className="search-bar">
            <form>
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

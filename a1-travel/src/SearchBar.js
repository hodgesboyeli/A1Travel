import React from 'react';

function SearchBar() {
    return (
        <div className="search-bar">
            <form>
                <input type="text" placeholder="Search for a location..." />
                <button type="submit">
                    <i className="fas fa-search"></i> {/* Font Awesome magnifying glass icon */}
                </button>
            </form>
        </div>
    );
}

export default SearchBar;

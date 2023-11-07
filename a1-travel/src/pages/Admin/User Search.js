import React, { useState } from 'react';
import AdminNavbar from '../AdminNavbar';
import {app, db} from "../../Firebase";
import {getDocs, query, collection, where} from 'firebase/firestore'

export default function UserSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchBy, setSearchBy] = useState('global'); // Set the default search criteria
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    const handleSearchByChange = (event) => {
        setSearchBy(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        // Handle the search logic based on the selected searchBy criteria and searchTerm
        // You can implement this logic as needed
        console.log(`Search by: ${searchBy}, Term: ${searchTerm}`);
    };

    const handleSearch = async(e) => {
        e.preventDefault();
        // Perform a Firestore query to find users that match the searchQuery
        const querySnapshot = await
        getDocs(query(collection(db,'Users'), where(searchBy, '>=', searchQuery), where(searchBy, '<', searchQuery + '\uf8ff')));

        const matchedUsers = querySnapshot.docs.map((doc) => doc.data());
        console.log(matchedUsers);
        setFilteredUsers(matchedUsers);
    };

    return (
        <div>
            <AdminNavbar />
            <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                <h1>User Search</h1>
            </div>

            <div className="container-fluid d-flex justify-content-center">
                <p className="form-check-inline">Search By:</p>
                <label style={{ marginRight: 10 }}>
                    <input
                        className="form-check-input form-check-inline"
                        type="radio"
                        value="firstName"
                        checked={searchBy === 'firstName'}
                        onChange={handleSearchByChange}
                    />
                    First Name
                </label>
                <label style={{ marginRight: 10 }}>
                    <input
                        className="form-check-input form-check-inline"
                        type="radio"
                        value="lastName"
                        checked={searchBy === 'lastName'}
                        onChange={handleSearchByChange}
                    />
                    Last Name
                </label>
                <label style={{ marginRight: 10 }}>
                    <input
                        className="form-check-input form-check-inline"
                        type="radio"
                        value="username"
                        checked={searchBy === 'username'}
                        onChange={handleSearchByChange}
                    />
                    Username
                </label>
                <label style={{ marginRight: 10 }}>
                    <input
                        className="form-check-input form-check-inline"
                        type="radio"
                        value="email"
                        checked={searchBy === 'email'}
                        onChange={handleSearchByChange}
                    />
                    Email
                </label>
                <label style={{ marginRight: 10 }}>
                    <input
                        className="form-check-input form-check-inline"
                        type="radio"
                        value="id"
                        checked={searchBy === 'id'}
                        onChange={handleSearchByChange}
                    />
                    ID
                </label>
            </div>

            <div className="search-bar">
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit">
                        <i className="fas fa-search"></i> {/* Font Awesome magnifying glass icon */}
                    </button>
                </form>
            </div>
            <div className="user-list">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => (
                        <div key={index} className="user-card">
                            <div>Name: {user.firstName} {user.lastName}</div>
                            <div>Email: {user.email}</div>
                        </div>
                    ))
                ) : (
                    <div>No matching users found</div>
                )}
            </div>
        </div>
    );
}

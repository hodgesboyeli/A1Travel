import React, {useRef, useState} from 'react';
import AdminNavbar from '../AdminNavbar';
import {db} from "../../Firebase";
import {getDocs, query, collection, where} from 'firebase/firestore'

export default function UserSearch() {
    const [searchBy, setSearchBy] = useState('global'); // Set the default search criteria
    const searchQuery = useRef();
    const [filteredUsers, setFilteredUsers] = useState([]);

    const handleSearchByChange = (event) => {
        setSearchBy(event.target.value);
    };

    const handleSearch = async(e) => {
        e.preventDefault();
        const search = searchQuery.current.value;
        // Perform a Firestore query to find users that match the searchQuery
        const querySnapshot = await getDocs(query(collection(
                db, 'Users'),
            where(searchBy, '>=', search),
            where(searchBy, '<', search + '\uf8ff')));

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
                        className="form-control"
                        placeholder="Search"
                        ref={searchQuery}
                    />
                    <button type="submit">
                        <i className="fas fa-search"></i> {/* Font Awesome magnifying glass icon */}
                    </button>
                </form>
            </div>
            <div className="user-list">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => (
                        <div key={index} className="card">
                            <div className="row g-0">
                                <div className="col">
                                    <img src={process.env.PUBLIC_URL+'/blank-profile-pic.png'} className="pfp-img img-fluid rounded-start" alt="Profile"/>
                                </div>
                                <div className="col">
                                    <div className="card-body">
                                        <div className="card-title">
                                            <b>{user.firstName} {user.lastName}</b>
                                        </div>
                                        <div className="card-text">
                                            {user.email}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No matching users found</div>
                )}
            </div>
        </div>
    );
}

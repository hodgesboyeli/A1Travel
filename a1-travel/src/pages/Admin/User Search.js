import React, {useRef, useState} from 'react';
import AdminNavbar from '../../Navbars/AdminNavbar';
import Axios from "axios";

export default function UserSearch() {
    const [userIndex, setUserIndex] = useState(0);
    const [searchBy, setSearchBy] = useState(''); // Set the default search criteria
    const searchQuery = useRef();
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleSearchByChange = (event) => {
        setSearchBy(event.target.value);
    };

    const handleSearch = async(e) => {
        e.preventDefault();
        const search = searchQuery.current.value;
        // Perform a Firestore query from backend matching each user's field with a value
        const response = await Axios.get('http://localhost:8080/api/user/?field='+searchBy+'&value='+search);
        //returns an object with object array member "users"
        const matchedUsers = response.data.users;
        console.log(matchedUsers);
        setFilteredUsers(matchedUsers);
    };
    const handleActiveSwitch = (index) => {
        setUserIndex(index);
        setShowModal(true);
    }
    const handleConfirm = async() =>{
        let email = '';
        if (filteredUsers.length > 0){
            email = filteredUsers[userIndex].email;
        } else {
            setShowModal(false);
            return;
        }
        try {
            const temp = filteredUsers[userIndex].isActive;
            const response = await Axios.put('http://localhost:8080/api/account/'+email+'?set='+temp);
            filteredUsers[userIndex].isActive = !response.data;
        } catch (error) {
            console.log(error);
        } finally {
            setShowModal(false);
        }
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

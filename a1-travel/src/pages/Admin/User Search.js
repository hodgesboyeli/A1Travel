import React, {useRef, useState} from 'react';
import AdminNavbar from '../AdminNavbar';
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
                        className="form-control"
                        placeholder="Search"
                        ref={searchQuery}
                    />
                    <button type="submit">
                        <i className="fas fa-search"></i> {/* Font Awesome magnifying glass icon */}
                    </button>
                </form>
            </div>
            <div className="container mt-4 ms-5 me-5 mb-4">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => (
                        <div key={index} className="card">
                            <div className="d-flex flex-row justify-content-center align-items-center">
                                <div className="col-md-1 me-auto">
                                    <img src={process.env.PUBLIC_URL+'/blank-profile-pic.png'} className="pfp-img img-fluid rounded-start" alt="Profile"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="card-body">
                                        <div className="card-title">
                                            <b>{user.firstName} {user.lastName}</b>
                                        </div>
                                        <div className="card-text">
                                            {user.email}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-1 text-center d-flex flex-column align-items-center form-check form-switch">
                                    <label className="form-check-label" htmlFor={`flexSwitchCheckDefault-${index}`}>
                                        <b>Active</b>
                                    </label>
                                    <input className="form-check-input me-auto ms-auto"
                                           type="checkbox"
                                           role="switch"
                                           id={`flexSwitchCheckDefault-${index}`}
                                           readOnly={1}
                                           checked={user.isActive}
                                           disabled={user.email===sessionStorage.getItem('email')}
                                           onClick={()=>handleActiveSwitch(index)}
                                    />
                                </div>
                                <div className="col-md-1"/>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='text-center'>No matching users found</div>
                )}
            </div>
            <div className={"modal fade" + (showModal ? " show" : "")} style={{display: showModal ? "block" : "none"}} tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirm Action</h5>
                            <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to { (filteredUsers.length > 0) ? (filteredUsers[userIndex].isActive ? 'disable':'enable') : ''} this user account?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleConfirm}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

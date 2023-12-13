import React, {useRef, useState} from 'react';
import AdminNavbar from '../../Navbars/AdminNavbar';
import Axios from "axios";
import {getAuth} from "firebase/auth";
import {auth} from "../../Firebase";

export default function TASearchData() {
    // const [userIndex, setUserIndex] = useState(0);
    // const [searchBy, setSearchBy] = useState(''); // Set the default search criteria
    // const searchQuery = useRef();
    // const [filteredUsers, setFilteredUsers] = useState([]);
    // const [userPfp, setUserPfp] = useState([]);
    // const [showModal, setShowModal] = useState(false);
    //
    // const handleSearchByChange = (event) => {
    //     setSearchBy(event.target.value);
    // };
    //
    // const handleSearch = async(e) => {
    //     e.preventDefault();
    //     // Perform a Firestore query from backend matching each user's field with a value
    //     const search = searchQuery.current.value;
    //     const response = await Axios.get('http://localhost:8080/api/user/?field='+searchBy+'&value='+search);
    //     const matchedUsers = response.data.users;
    //
    //     // Array to store user profile pictures
    //     let profilePictures = [];
    //     // For each user, get user details from auth and extract profile picture
    //
    //     for (const user of matchedUsers) {
    //         const userEmail = user.email; // Assuming each user object has an email field
    //         // Get user details from auth (modify this part based on how your auth system works)
    //         const userDetails = await auth.getUserByEmail(userEmail); // This is just a placeholder, replace with actual auth call
    //         const userProfilePicture = userDetails.photoURL;
    //         // Assuming UserInfo is a method or an object where you can get user info
    //         // Add profile picture to the array
    //         if (userProfilePicture) {
    //             profilePictures.push(userProfilePicture);
    //         }
    //     }
    //     // Update the state with the new profile pictures
    //     setUserPfp(profilePictures);
    //     setFilteredUsers(matchedUsers);
    //     console.log(filteredUsers);
    // };
    // const handleActiveSwitch = (index) => {
    //     setUserIndex(index);
    //     setShowModal(true);
    // }
    // const handleConfirm = async() =>{
    //     let email = '';
    //     if (filteredUsers.length > 0){
    //         email = filteredUsers[userIndex].email;
    //     } else {
    //         setShowModal(false);
    //         return;
    //     }
    //     try {
    //         const temp = filteredUsers[userIndex].isActive;
    //         const response = await Axios.put('http://localhost:8080/api/account/'+email+'?set='+temp);
    //         filteredUsers[userIndex].isActive = !response.data;
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         setShowModal(false);
    //     }
    // };

    return (
        <div>
            <AdminNavbar />
            <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                <h1>Search Data </h1>
            </div>

            <div className="container-fluid d-flex justify-content-center">
                <p className="form-check-inline">Search: </p>
                <input
                    className="form-check-input form-check-inline"
                    type="radio"
                    name="AddNew"
                    id="radioTransportation"
                />
                <label style={{ marginRight: 10 }} htmlFor="radioEvent">
                    Transportation
                </label>
                <input
                    className="form-check-input form-check-inline"
                    type="radio"
                    name="AddNew"
                    id="radioLodging"
                />
                <label style={{ marginRight: 10 }} htmlFor="radioTransportation">
                    Lodging
                </label>
                <input
                    className="form-check-input form-check-inline"
                    type="radio"
                    name="AddNew"
                    id="radioEvent"
                />
                <label style={{ marginRight: 10 }} htmlFor="radioEvent">
                    Event
                </label>
            </div>
            {/*<div className="search-bar">*/}
            {/*    <form onSubmit={handleSearch}>*/}
            {/*        <input*/}
            {/*            type="text"*/}
            {/*            placeholder="Search"*/}
            {/*            ref={searchQuery}*/}
            {/*        />*/}
            {/*        <button type="submit">*/}
            {/*            <i className="fas fa-search"></i> /!* Font Awesome magnifying glass icon *!/*/}
            {/*        </button>*/}
            {/*    </form>*/}
            {/*</div>*/}
            {/*<div className="container mt-4 ms-5 me-5 mb-4">*/}
            {/*    {filteredUsers.length > 0 ? (*/}
            {/*        filteredUsers.map((user, index) => (*/}
            {/*            <div key={index} className="card">*/}
            {/*                <div className="d-flex flex-row justify-content-center align-items-center">*/}
            {/*                    <div className="col-md-1 me-auto">*/}
            {/*                        <img src={process.env.PUBLIC_URL+'/blank-profile-pic.png'} className="pfp-img img-fluid rounded-start" alt="Profile"/>*/}
            {/*                    </div>*/}
            {/*                    <div className="col-md-6">*/}
            {/*                        <div className="card-body">*/}
            {/*                            <div className="card-title">*/}
            {/*                                <b>{user.firstName} {user.lastName}</b>*/}
            {/*                            </div>*/}
            {/*                            <div className="card-text">*/}
            {/*                                {user.email}*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <div className="col-md-1 text-center d-flex flex-column align-items-center form-check form-switch">*/}
            {/*                        <label className="form-check-label" htmlFor={`flexSwitchCheckDefault-${index}`}>*/}
            {/*                            <b>Active</b>*/}
            {/*                        </label>*/}
            {/*                        <input className="form-check-input me-auto ms-auto"*/}
            {/*                               type="checkbox"*/}
            {/*                               role="switch"*/}
            {/*                               id={`flexSwitchCheckDefault-${index}`}*/}
            {/*                               readOnly={1}*/}
            {/*                               checked={user.isActive}*/}
            {/*                               disabled={user.email===sessionStorage.getItem('email')}*/}
            {/*                               onClick={()=>handleActiveSwitch(index)}*/}
            {/*                        />*/}
            {/*                    </div>*/}
            {/*                    <div className="col-md-1"/>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        ))*/}
            {/*    ) : (*/}
            {/*        <div className='text-center'>No matching users found</div>*/}
            {/*    )}*/}
            {/*</div>*/}
            {/*<div className={"modal fade" + (showModal ? " show" : "")} style={{display: showModal ? "block" : "none"}} tabIndex="-1">*/}
            {/*    <div className="modal-dialog">*/}
            {/*        <div className="modal-content">*/}
            {/*            <div className="modal-header">*/}
            {/*                <h5 className="modal-title">Confirm Action</h5>*/}
            {/*                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>*/}
            {/*            </div>*/}
            {/*            <div className="modal-body">*/}
            {/*                Are you sure you want to { (filteredUsers.length > 0) ? (filteredUsers[userIndex].isActive ? 'disable':'enable') : ''} this user account?*/}
            {/*            </div>*/}
            {/*            <div className="modal-footer">*/}
            {/*                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>*/}
            {/*                <button type="button" className="btn btn-primary" onClick={handleConfirm}>Confirm</button>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
}

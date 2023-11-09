import React from 'react';
import axios from "axios";

export default function Navbar(){

    const handleLogout = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/logout`);

            if (response.data === 'Logged out successfully') {
                window.location.href = '/login';
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="d-flex justify-content-end" style={{paddingLeft: 10}}>
                <img src={process.env.PUBLIC_URL + "/A1Logo.png"} alt="A1 Travel Logo" height="60" width="60"/>
                <a className="brand-name" style={{color: "#FF6C37"}}>A1 TRAVEL</a>
                <div className="collapse navbar-collapse " id="navbarNav">
                    <ul className="navbar-nav justify-content-center">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Past Bookings</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Support</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Profile</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Settings</a>
                        </li>
                    </ul>
                </div>
            </div>
            <button type="log-out" className="sign-out-button btn-md" onClick={handleLogout}>
                <i className="fas fa-sign-out"></i>
            </button>
        </nav>
    )
}
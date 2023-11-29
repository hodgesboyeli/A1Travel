import React from 'react';
import {auth} from "../Firebase";
import axios from "axios";

export default function TravelAdminNavbar(){

    const handleLogout = async () => {
        try {
            // Sign the user out with Firebase Authentication
            await auth.signOut();

            // Make a request to the server's logout endpoint (optional, depends on your server setup)
            const response = await axios.get('http://localhost:8080/api/logout');

            if (response.data === 'Logged out successfully') {
                // Redirect the user to the login page
                window.location.href = '/login';
            } else {
                console.error('Logout failed on the server');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg" style={{backgroundColor:"#FFF"}}>
            <div className="d-flex justify-content-end" style={{paddingLeft: 10}}>
                <img src={process.env.PUBLIC_URL + "/A1Logo.png"} alt="A1 Travel Logo" height="60" width="60"/>
                <a className="brand-name" style={{color: "#FF6C37"}}>A1 TRAVEL</a>
                <div className="collapse navbar-collapse " id="navbarNav">
                    <ul className="navbar-nav justify-content-center">
                        <li className="nav-item">
                            <a className="nav-link" href="http://localhost:3000/ta-home" style={{color: "#000"}}>Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" style={{color: "#000"}}>Inbox</a>
                        </li>
                    </ul>
                </div>
            </div>
            <button type="inbox" className="admin-inbox-button btn-md">
                <a className="nav-link" href="http://localhost:3000/ta-inbox"><i className="fas fa-envelope" style={{color: "black"}}></i></a>
            </button>
            <button type="log-out" className="sign-out-button btn-md" onClick={handleLogout}>
                <i className="fas fa-sign-out" style={{backgroundColor: "#FFF", color: "#000"}}></i>
            </button>
        </nav>
    )
}
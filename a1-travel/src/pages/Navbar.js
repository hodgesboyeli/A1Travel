import React from 'react';

export default function Navbar(){
    return (
        <div className="header">
            <nav className="navbar navbar-expand-lg">
                <img src={process.env.PUBLIC_URL + "/A1Logo.png"} alt="A1 Travel Logo" height="60" width="60"/>
                <a className="brand-name" style={{color: "#FF6C37"}}>A1 TRAVEL</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
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
            </nav>
        </div>
    )
}
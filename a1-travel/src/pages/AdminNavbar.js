import React from 'react';

export default function AdminNavbar(){
    return (
        <div className="header">
            <nav className="navbar navbar-expand-lg" style={{backgroundColor:"#FFF"}}>
                <img src={process.env.PUBLIC_URL + "/A1Logo.png"} alt="A1 Travel Logo" height="60" width="60"/>
                <a className="brand-name" style={{color: "#FF6C37"}}>A1 TRAVEL</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarNav">
                    <ul className="navbar-nav justify-content-center">
                        <li className="nav-item">
                            <a className="nav-link" href="#" style={{color: "#000"}}>Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" style={{color: "#000"}}>Inbox</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
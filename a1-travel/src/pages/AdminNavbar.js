import React from 'react';

export default function AdminNavbar(){
    return (
        <nav className="navbar navbar-expand-lg" style={{backgroundColor:"#FFF"}}>
            <div className="d-flex justify-content-end" style={{paddingLeft: 10}}>
                <img src={process.env.PUBLIC_URL + "/A1Logo.png"} alt="A1 Travel Logo" height="60" width="60"/>
                <a className="brand-name" style={{color: "#FF6C37"}}>A1 TRAVEL</a>
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
            </div>
            <button type="log-out" className="sign-out-button btn-md">
                <i className="fas fa-sign-out" style={{backgroundColor: "#FFF", color: "#000"}}></i>
            </button>
        </nav>
    )
}
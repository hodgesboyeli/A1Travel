import React from 'react';
import AdminNavbar from "../../Navbars/AdminNavbar";
import {Link} from "react-router-dom";
import TravelAdminNavbar from "../../Navbars/TravelAdminNavbar";
export default function TAHome(){
    return (
        <div className="page-style">
            <TravelAdminNavbar/>
            <div className="container-fluid d-flex justify-content-center mt-5" style={{paddingTop: 40}}>
                <h1 style={{color : "#FFF"}}>Travel Administrator Dashboard</h1>
            </div>
            <div className="container-fluid d-flex justify-content-center" style={{marginTop: 60}}>
                <Link to={"/ta/select"}>
                    <button type="button" className="admin-button" style={{marginRight: 20}}>
                        <i className="fas fa-database d-flex justify-content-center" style={{fontSize: 80}}></i>
                        Database Management
                    </button>
                </Link>
                <Link to="/ta/travel-history">
                    <button type="button" className="admin-button">
                        <i className="fas fa-clock-rotate-left d-flex justify-content-center" style={{fontSize: 80}}></i>
                        Travel History
                    </button>
                </Link>
            </div>
            <div className="container-fluid d-flex justify-content-center" style={{marginTop: 60}}>
                <button type="button" className="admin-button">
                    <i className="fas fa-gear d-flex justify-content-center" style={{fontSize: 80}}></i>
                    Settings
                </button>
            </div>
            <div className="page-style container-fluid d-flex justify-content-center" style={{marginTop: 72, padding: 30}}>
            </div>
        </div>
    )
}
import React from 'react';
import AdminNavbar from "../AdminNavbar";
import {Link} from "react-router-dom";
export default function TAHome(){
    return (
        <div className="page-style">
            <AdminNavbar/>
            <div className="container-fluid d-flex justify-content-center mt-5" style={{paddingTop: 30}}>
                <h1 style={{color : "#FFF"}}>Travel Administrator Dashboard</h1>
            </div>
            <div className="container-fluid d-flex justify-content-center mt-5">
                <Link to={"/travel_admin/database-management"}>
                    <button type="button" className="admin-button" style={{marginRight: 20}}>
                        <i className="fas fa-database d-flex justify-content-center" style={{fontSize: 80}}></i>
                        Database Management
                    </button>
                </Link>
                <button type="button" className="admin-button">
                    <i className="fas fa-clock-rotate-left d-flex justify-content-center" style={{fontSize: 80}}></i>
                    Travel History
                </button>
            </div>
            <div className="container-fluid d-flex justify-content-center mt-3">
                <button type="button" className="admin-button">
                    <i className="fas fa-gear d-flex justify-content-center" style={{fontSize: 80}}></i>
                    Settings
                </button>
            </div>
            <div className="page-style container-fluid d-flex justify-content-center mt-3" style={{paddingTop:77}}>
            </div>
        </div>
    )
}
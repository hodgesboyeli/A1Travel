import React from 'react';
import AdminNavbar from "../../Navbars/AdminNavbar";
import {Link} from "react-router-dom";
export default function AdminHome(){
    return (
        <div className="page-style">
            <AdminNavbar/>
            <div className="container-fluid d-flex justify-content-center mt-5" style={{paddingTop: 30}}>
                <h1 style={{color : "#FFF"}}>Administrator Dashboard</h1>
            </div>
            <div className="container-fluid d-flex justify-content-center mt-5">
                <Link to={"/admin/user-search"}>
                    <button type="button" className="admin-button" style={{marginRight: 20}}>
                        <i className="fas fa-user d-flex justify-content-center" style={{fontSize: 80}}></i>
                        User Search
                    </button>
                </Link>
                <Link to={"/admin/create-announcements"}>
                    <button type="button" className="admin-button">
                        <i className="fas fa-bullhorn d-flex justify-content-center" style={{fontSize: 80}}></i>
                        Announcements
                    </button>
                </Link>
            </div>
            <div className="container-fluid d-flex justify-content-center mt-3">
                <button type="button" className="admin-button" style={{marginRight: 20}}>
                    <i className="fas fa-folder-closed d-flex justify-content-center" style={{fontSize: 80}}></i>
                    Reports
                </button>
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
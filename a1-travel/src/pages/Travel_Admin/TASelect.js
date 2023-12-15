import React from 'react';
import {Link} from "react-router-dom";
import TravelAdminNavbar from "../../Navbars/TravelAdminNavbar";
export default function TASelect(){
    return (
        <div className="page-style">
            <TravelAdminNavbar/>
            <div className="container-fluid d-flex justify-content-center mt-4 mb-8" style={{paddingTop: 50}}>
                <h1 style={{color : "#FFF"}}>Please Select</h1>
            </div>
            <div className="container-fluid d-flex justify-content-center mt-5 mb-12">
                <Link to="/ta/database-management">
                    <button type="button mr-1" className="admin-button" style={{marginRight: 20}}>
                        Add New
                        <i className="fas fa-plus d-flex justify-content-center" style={{fontSize: 80, color: "#037F10"}}></i>
                    </button>
                </Link>
                <Link to="/ta/search-data">
                    <button type="button" className="admin-button">
                        Search Current Data
                        <i className="fas fa-search d-flex justify-content-center" style={{fontSize: 80}}></i>
                    </button>
                </Link>
            </div>
            <div className="page-style container-fluid d-flex justify-content-center mt-3" style={{paddingTop:77}}>
            </div>
        </div>
    )
}
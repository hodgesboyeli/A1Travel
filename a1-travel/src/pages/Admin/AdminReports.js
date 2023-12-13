import React, {useEffect, useRef, useState} from 'react';
import AdminNavbar from "../../Navbars/TravelAdminNavbar";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {Modal} from "bootstrap";
import {auth} from "../../Firebase";
import "../../Firebase.js";
export default function AdminReports() {

    return (
        <div>
            <AdminNavbar />
            <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                <h1>Reports</h1>
            </div>
            <div className="container-fluid d-flex justify-content-center">
                <h1 style={{fontSize: 25}}>Choose a report type</h1>
            </div>
            <div className="container-fluid d-flex justify-content-center">
                <button type="button" className="btn btn-primary" style={{marginLeft: 15, marginRight: 15}}>Number of Trips to a destination</button>
                <button type="button" className="btn btn-primary" style={{marginLeft: 15, marginRight: 15}}>Average Budget of Trips</button>
                <button type="button" className="btn btn-primary" style={{marginLeft: 15, marginRight: 15}}>Total Revenue from Trips</button>
                <button type="button" className="btn btn-primary" style={{marginLeft: 15, marginRight: 15}}>Trips Within Budget</button>
                <button type="button" className="btn btn-primary" style={{marginLeft: 15, marginRight: 15}}>Trips Over Budget</button>
            </div>
        </div>

    );
}
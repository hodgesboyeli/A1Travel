import React from 'react';
import AdminNavbar from "../AdminNavbar";
import TravelAdminNavbar from "../TravelAdminNavbar";
export default function DatabaseManagement(){
    return (
        <div>
            <TravelAdminNavbar/>
            <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                <h1>Database Management</h1>
            </div>
            <div className="container-fluid d-flex justify-content-center">
                <p className="form-check-inline">Add New: </p>
                <input className="form-check-input form-check-inline" type="radio" name="Event" id="radioEvent"/>
                <label style={{marginRight: 10}} htmlFor="radioEvent">Event</label>
                <input className="form-check-input form-check-inline" type="radio" name="Event"
                       id="radioTransportation"/>
                <label style={{marginRight: 10}} htmlFor="radioTransportation">Transportation</label>
                <input className="form-check-input form-check-inline" type="radio" name="Event" id="radioDestination"/>
                <label style={{marginRight: 10}} htmlFor="radioDestination">Destination</label>
            </div>
        </div>
    );
}
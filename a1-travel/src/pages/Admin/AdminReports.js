import React, { useState, useEffect } from 'react';
import AdminNavbar from "../../Navbars/TravelAdminNavbar";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from "bootstrap";
import { auth } from "../../Firebase.js";

export default function AdminReports() {
    const [destination, setDestination] = useState('');
    const [totalTrips, setTotalTrips] = useState(null);
    const [showInput, setShowInput] = useState(false);

    const handleDestinationChange = (event) => {
        setDestination(event.target.value);
    };

    const handleGetTrips = async () => {
        try {
            const response = await Axios.get(`http://localhost:8080/api/trip/destination/?destination=${destination}`);
            setTotalTrips(response.data.trips.length);
        } catch (error) {
            console.error("Error fetching trips:", error);
        }
    };

    const handleToggleInput = () => {
        // Reset state when toggling input
        if (showInput) {
            setDestination('');
            setTotalTrips(null);
        }
        setShowInput(!showInput);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleGetTrips();
        }
    };

    // Reset state when the component is about to unmount
    useEffect(() => {
        return () => {
            setDestination('');
            setTotalTrips(null);
            setShowInput(false);
        };
    }, []);

    return (
        <div>
            <AdminNavbar />
            <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                <h1>Reports</h1>
            </div>
            <div className="container-fluid d-flex justify-content-center">
                <h1 style={{ fontSize: 25 }}>Choose a report type</h1>
            </div>
            <div className="container-fluid d-flex justify-content-center">
                <button type="button" className="btn btn-primary" style={{ marginLeft: 15, marginRight: 15 }} onClick={handleToggleInput}>
                    Number of Trips to a destination
                </button>
                <button type="button" className="btn btn-primary" style={{ marginLeft: 15, marginRight: 15 }}>Average Budget of Trips</button>
                <button type="button" className="btn btn-primary" style={{ marginLeft: 15, marginRight: 15 }}>Total Revenue from Trips</button>
                <button type="button" className="btn btn-primary" style={{ marginLeft: 15, marginRight: 15 }}>Trips Within Budget</button>
                <button type="button" className="btn btn-primary" style={{ marginLeft: 15, marginRight: 15 }}>Trips Over Budget</button>
            </div>
            <div className="container-fluid d-flex justify-content-center" style={{ marginTop: 40 }}>
                {showInput && (
                    <>
                        <input
                            type="text"
                            className="form-control me-2"
                            style={{ maxWidth: '200px' }}
                            value={destination}
                            onChange={handleDestinationChange}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter Destination"
                        />
                        <button type="button" className="btn btn-success" onClick={handleGetTrips}>Generate</button>
                    </>
                )}
            </div>
            <div className="container-fluid d-flex justify-content-center">
                {totalTrips !== null && showInput && (
                    <div className="container-fluid d-flex justify-content-center mt-3">
                        <p>Total trips to {destination}: {totalTrips}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

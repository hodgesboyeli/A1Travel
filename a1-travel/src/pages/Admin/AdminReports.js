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
    const [budgetAvg, setBudgetAvg] = useState(null);
    const [totalRev, setTotalRev] = useState(null);
    const [totalWithinBudget, setTotalWithinBudget] = useState(null);
    const [totalOverBudget, setTotalOverBudget] = useState(null);
    const [showInput, setShowInput] = useState(false);
    const [showBudgetAvg, setShowBudgetAvg] = useState(false);
    const [showTotalRev, setShowTotalRev] = useState(false);
    const [showTotalWithinBudget, setShowTotalWithinBudget] = useState(false);
    const [showTotalOverBudget, setShowTotalOverBudget] = useState(false);


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

    const handleGetBudgetAvg = async () => {
        try {
            const response = await Axios.get(`http://localhost:8080/api/trip/avg-budget`);
            setBudgetAvg(response.data.averageBudget);
        } catch (error) {
            console.error("Error fetching trips:", error);
        }
        setShowBudgetAvg(true);
    };

    const handleGetTotalRev = async () => {
        /*try {
            const response = await Axios.get(`http://localhost:8080/api/trip/destination/?destination=${destination}`);
            setTotalTrips(response.data.trips.length);
        } catch (error) {
            console.error("Error fetching trips:", error);
        }*/
        setShowTotalRev(true);
    };

    const handleGetWithinBudget = async () => {
        /*try {
            const response = await Axios.get(`http://localhost:8080/api/trip/destination/?destination=${destination}`);
            setTotalTrips(response.data.trips.length);
        } catch (error) {
            console.error("Error fetching trips:", error);
        }*/
        setShowTotalWithinBudget(true);
    };

    const handleGetOverBudget = async () => {
        /*try {
            const response = await Axios.get(`http://localhost:8080/api/trip/destination/?destination=${destination}`);
            setTotalTrips(response.data.trips.length);
        } catch (error) {
            console.error("Error fetching trips:", error);
        }*/
        setShowTotalOverBudget(true);
    };

    const handleGetTripsClick = () => {
        setShowBudgetAvg(false);
        // Reset state when toggling input
        if (showInput) {
            setDestination('');
            setTotalTrips(null);
        }
        setShowInput(!showInput);
    };

    const handleGetBudgetAvgClick = () => {
        setShowInput(false);
        // Reset state when toggling input
        if (showBudgetAvg) {
            setBudgetAvg(null);
        }
        setShowBudgetAvg(!showBudgetAvg);
    };

    useEffect(() => {
        // Check if showBudgetAvg is true before fetching data
        if (showBudgetAvg) {
            handleGetBudgetAvg();
        }
    }, [showBudgetAvg]);


    /*const handleGetTotalRevClick = () => {
        setTotalRev(null);
    };

    const handleGetWithinBudgetClick = () => {
        setTotalWithinBudget(null);
    };

    const handleGetOverBudgetClick = () => {
        setTotalOverBudget(null);
    };*/

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
            setBudgetAvg(null);
            setTotalRev(null);
            setTotalWithinBudget(null);
            setTotalOverBudget(null);
            setShowInput(false);
            setShowBudgetAvg(false);
            setShowTotalRev(false);
            setShowTotalWithinBudget(false);
            setShowTotalOverBudget(false);
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
                <button type="button" className="btn btn-primary" style={{ marginLeft: 15, marginRight: 15 }} onClick={handleGetTripsClick}>
                    Number of Trips to a destination
                </button>
                <button type="button" className="btn btn-primary" style={{ marginLeft: 15, marginRight: 15 }} onClick={handleGetBudgetAvgClick}>
                    Average Budget of Trips
                </button>
                <button type="button" className="btn btn-primary" style={{ marginLeft: 15, marginRight: 15 }} onClick={handleGetTotalRev}>
                    Total Revenue from Trips
                </button>
                <button type="button" className="btn btn-primary" style={{ marginLeft: 15, marginRight: 15 }} onClick={handleGetWithinBudget}>
                    Trips Within Budget
                </button>
                <button type="button" className="btn btn-primary" style={{ marginLeft: 15, marginRight: 15 }} onClick={handleGetOverBudget}>
                    Trips Over Budget
                </button>
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
            <div className="container-fluid d-flex justify-content-center">
                {budgetAvg !== null && showBudgetAvg && (
                    <div className="container-fluid d-flex justify-content-center mt-3">
                        <p style={{fontSize: 30}}>Budget Average of all trips: ${budgetAvg}</p>
                    </div>
                )}
            </div>
            <div className="container-fluid d-flex justify-content-center">
                {totalRev !== null && showTotalRev && (
                    <div className="container-fluid d-flex justify-content-center mt-3">
                        <p>Total revenue from all trips: ${totalRev}</p>
                    </div>
                )}
            </div>
            <div className="container-fluid d-flex justify-content-center">
                {totalWithinBudget !== null && showTotalWithinBudget && (
                    <div className="container-fluid d-flex justify-content-center mt-3">
                        <p>Total trips within budget:{totalWithinBudget}</p>
                    </div>
                )}
            </div>
            <div className="container-fluid d-flex justify-content-center">
                {totalOverBudget !== null && showTotalOverBudget && (
                    <div className="container-fluid d-flex justify-content-center mt-3">
                        <p>Total trips over budget: {totalOverBudget}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

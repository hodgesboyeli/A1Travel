import React, { useState, useEffect } from 'react';
import Navbar from "../../Navbars/Navbar";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { app } from '../../Firebase';
import { getFirestore } from 'firebase/firestore';
import axios from 'axios';

export default function CustDestination() {
    const {state} = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [locationOptions, setLocationOptions] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [newBudget, setNewBudget] = useState('');
    const navigate = useNavigate();
    const [budget, setBudget] = useState(null);
    const [cartTotal, setCartTotal] = useState(sessionStorage.getItem('cartTotal'));

    useEffect(() => {
        const fetchFlightsLocations = async () => {
            try {
                const db = getFirestore(app);
                const response = await axios.get(`http://localhost:8080/api/flight/locations`);
                setLocationOptions(response.data.locations);
            } catch (error) {
                console.error('Error fetching flight locations:', error);
            }
        };
        const storedBudget = sessionStorage.getItem('budget');
        setBudget(storedBudget);

        fetchFlightsLocations();
    }, []);

    const handleLocationSelect = (selectedDestination) => {
        sessionStorage.setItem('selectedDestination', selectedDestination);
        setSelectedDestination(selectedDestination);
        console.log('Selected Destinations:', selectedDestination);
    };

    const handleEditClick = () => {
        // Toggle the editMode value
        setEditMode((prevEditMode) => !prevEditMode);
    };

    const formatNumber = (value) => {
        // Remove all non-digit characters
        const numericValue = value.replace(/[^\d]/g, '');

        // Format the number with commas
        return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleBudgetChange = (e) => {
        setNewBudget(formatNumber(e.target.value));
    };

    const handleSaveClick = () => {
        // Validate and save the new budget
        const newBudgetValue = parseFloat(newBudget.replace(/,/g, ''));
        if (!isNaN(newBudgetValue) && newBudgetValue >= 0) {
            sessionStorage.setItem('budget', newBudgetValue);
            setBudget(newBudgetValue);
            setEditMode(false);
        } else {
            // Handle invalid input (optional)
            console.log('Invalid budget input');
            // You can show an error message to the user if needed
        }
    };

    const handleRemoveBudget = () => {
        sessionStorage.setItem('budget', -1);
        setBudget(-1);
        setEditMode(false);
    };

    const isNextButtonDisabled = !selectedDestination;

    return (
        <>
            <Navbar />
            <div className="mt-5" style={{ paddingTop: 50 }}>
                <div className="text-end mr-3" style={{ paddingRight: 50 }}>
                    <p style={{ fontSize: 25, color: budget < 0 ? 'green' : cartTotal <= budget ? 'green' : 'red' }}>
                        <button type="button" className="edit-button btn-md" onClick={handleEditClick}>
                            <i className="fas fa-edit"></i>
                        </button>
                        ${cartTotal}/{budget < 0 ? '∞' : budget}
                    </p>
                    {editMode && (
                        <div className="d-flex flex-column align-items-end mb-3">
                            <div className="d-flex mb-2">
                                <input
                                    type="text"
                                    value={newBudget}
                                    onChange={handleBudgetChange}
                                    className="form-control me-2"
                                    style={{ maxWidth: '145px' }}
                                    placeholder="Enter new budget"
                                />
                                <button onClick={handleSaveClick} className="btn btn-success">Save</button>
                            </div>
                            <button onClick={handleRemoveBudget} className="btn btn-secondary" style={{ width: '232px' }}>Remove Budget</button>
                        </div>
                    )}
                </div>
                <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                    <h1>Where do you want to go?</h1>
                </div>
                <div className="container-fluid d-flex justify-content-center">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search for a location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="container-fluid mt-3">
                    {locationOptions.map((destination, index) => (
                        <div
                            key={index}
                            className={`destination-option ${selectedDestination === destination ? 'selected-destination' : ''}`}
                            onClick={() => handleLocationSelect(destination)}
                        >
                            {destination}
                        </div>
                    ))}
                </div>
                <div className="text-center" style={{ marginTop: 40 }}>
                    <Link to="/flight-to-destination" state={ state }>
                        <button type="submit" className="btn btn-md custom-button" disabled={isNextButtonDisabled}>
                            Next
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}

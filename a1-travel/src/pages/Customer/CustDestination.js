import React, { useState, useEffect } from 'react';
import Navbar from "../../Navbars/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { app } from '../../Firebase';
import { getFirestore } from 'firebase/firestore';
import axios from 'axios';

export default function CustDestination() {
    const [searchQuery, setSearchQuery] = useState('');
    const [locationOptions, setLocationOptions] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState(null);
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

    const isNextButtonDisabled = !selectedDestination;

    return (
        <>
            <Navbar />
            <div className="mt-5" style={{ paddingTop: 50 }}>
                <div className="text-end mr-3" style={{ paddingRight: 50 }}>
                    <p style={{ fontSize: 25, color: cartTotal <= budget ? 'green' : 'red' }}>
                        ${cartTotal}/{budget}
                    </p>
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
                    <Link to="/flight-to-destination">
                        <button type="submit" className="btn btn-md custom-button" disabled={isNextButtonDisabled}>
                            Next
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}


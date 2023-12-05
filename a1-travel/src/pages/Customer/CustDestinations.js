import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar";
import { Link, useNavigate } from "react-router-dom";
import { app } from '../../Firebase';
import axios from 'axios';

export default function CustDestination() {
    const [searchQuery, setSearchQuery] = useState('');
    const [destinationOptions, setDestinationOptions] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                // Make a request to your backend API to get flights by arriveLocation
                const response = await axios.get(`/api/flight/${selectedDestination}`);
                const flightsData = response.data.flights;

                // Extract unique destinations from the fetched flights
                const uniqueDestinations = [...new Set(flightsData.flatMap(flight => [flight.arriveLocation, flight.departLocation]))];

                const filteredDestinations = uniqueDestinations.filter(destination =>
                    destination.toLowerCase().includes(searchQuery.toLowerCase())
                );

                setDestinationOptions(filteredDestinations);
            } catch (error) {
                console.error('Error fetching destinations:', error);
            }
        };

        fetchDestinations();
    }, [searchQuery, selectedDestination]);

    const handleDestinationSelect = (selectedDestination) => {
        sessionStorage.setItem('selectedDestination', selectedDestination);
        setSelectedDestination(selectedDestination);
        console.log('Selected Destination:', selectedDestination);
    };

    const isNextButtonDisabled = !selectedDestination;

    return (
        <>
            <Navbar />
            <div className="mt-5" style={{ paddingTop: 50 }}>
                <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                    <h1>Where do you want to go?</h1>
                </div>
                <div className="container-fluid d-flex justify-content-center">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search for a destination..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="container-fluid mt-3">
                    {destinationOptions.map((destination, index) => (
                        <div
                            key={index}
                            className={`destination-option ${selectedDestination === destination ? 'selected-destination' : ''}`}
                            onClick={() => handleDestinationSelect(destination)}
                        >
                            {destination}
                        </div>
                    ))}
                </div>
                <div className="text-center" style={{ marginTop: 40 }}>
                    <Link to="/flight">
                        <button type="submit" className="btn btn-md custom-button" disabled={isNextButtonDisabled}>
                            Next
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}

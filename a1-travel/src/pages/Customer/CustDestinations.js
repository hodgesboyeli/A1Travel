import React, { useState, useEffect } from 'react';
import Navbar from "../../Navbars/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { app } from '../../Firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

export default function CustDestination() {
    const [searchQuery, setSearchQuery] = useState('');
    const [destinationOptions, setDestinationOptions] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const db = getFirestore(app);
                const flightsCollection = await getDocs(collection(db, 'Flights'));
                const allFlights = flightsCollection.docs.map(doc => doc.data());

                const uniqueDestinations = [...new Set(allFlights.flatMap(flight => [flight.arriveLocation, flight.departLocation]))];

                const filteredDestinations = uniqueDestinations.filter(destination =>
                    destination.toLowerCase().includes(searchQuery.toLowerCase())
                );

                setDestinationOptions(filteredDestinations);
            } catch (error) {
                console.error('Error fetching destinations:', error);
            }
        };

        fetchDestinations();
    }, [searchQuery]);

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

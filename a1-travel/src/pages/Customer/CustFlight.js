import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { app } from '../../Firebase';
import { getFirestore, collection, where, query, getDocs } from 'firebase/firestore';

export default function CustFlight() {
    const [flights, setFlights] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [selectedFlight, setSelectedFlight] = useState(null); // Track selected flight
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const db = getFirestore(app);

                // Query flights where arriveLocation is equal to selectedDestination
                const q = query(collection(db, 'Flights'), where('arriveLocation', '==', selectedDestination));
                const querySnapshot = await getDocs(q);

                const flightsData = querySnapshot.docs.map(doc => doc.data());
                setFlights(flightsData);
            } catch (error) {
                console.error('Error fetching flights:', error);
            }
        };

        // Retrieve selected destination from session storage
        const storedDestination = sessionStorage.getItem('selectedDestination');
        if (storedDestination) {
            setSelectedDestination(storedDestination);
            fetchFlights();
        } else {
            // Redirect to the destination selection page if no selected destination is found
            navigate('/destination');
        }
    }, [selectedDestination, navigate]);

    const handleFlightSelect = (selectedFlight) => {
        setSelectedFlight(selectedFlight);
        console.log('Selected Flight:', selectedFlight);
    };

    const isBookButtonDisabled = !selectedFlight;

    return (
        <>
            <Navbar />
            <div className="mt-5" style={{ paddingTop: 50 }}>
                <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                    <h1>Available Flights to {selectedDestination}</h1>
                </div>
                <div className="container-fluid mt-3">
                    {flights.map((flight, index) => (
                        <div
                            key={index}
                            className={`destination-option ${selectedFlight === flight ? 'selected-destination' : ''}`}
                            onClick={() => handleFlightSelect(flight)}
                        >
                            <p>{flight.departLocation} to {flight.arriveLocation}</p>
                            <p>{flight.airline}</p>
                            <p>{/* Add more flight details */}</p>
                        </div>
                    ))}
                </div>
                <div className="text-center" style={{ marginTop: 40 }}>
                    <Link to="/booking">
                        <button type="submit" className="btn btn-md custom-button" disabled={isBookButtonDisabled}>
                            Book Flight
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}

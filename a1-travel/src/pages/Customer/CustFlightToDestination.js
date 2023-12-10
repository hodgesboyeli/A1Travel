import React, { useState, useEffect } from 'react';
import Navbar from "../../Navbars/Navbar";
import { Link, useNavigate } from 'react-router-dom';
import { app } from '../../Firebase';
import { getFirestore, collection, where, query, getDocs } from 'firebase/firestore';
import Axios from "axios";

export default function CustFlightToDestination() {
    const [flights, setFlights] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const db = getFirestore(app);

                // Query flights where arriveLocation is equal to selectedDestination in the backend
                const response = await Axios.get(`http://localhost:8080/api/flight/arrive/${storedDestination}`);
                setFlights(response.data.flights);
                flights.reduce((acc, flight) => {
                    acc = {flights: []};
                    return acc;
                }, {});
            } catch (error) {
                console.error('Error fetching flights:', error);
            }
        };

        // Retrieve selected destination from session storage
        const storedDestination = sessionStorage.getItem('selectedDestination');
        console.log(storedDestination);
        if (storedDestination) {
            setSelectedDestination(storedDestination);
            fetchFlights();
        } else {
            // Redirect to the destination selection page if no selected destination is found
            navigate('/destination');
        }
    }, [selectedDestination, navigate]);

    const handleFlightSelect = (selectedDepartureFlight) => {
        // Assuming selectedDepartureFlight has a unique identifier like flightId
        sessionStorage.setItem('selectedDepartureFlightId', selectedDepartureFlight.flightId);
        setSelectedFlight(selectedDepartureFlight);
        console.log('Selected Departure Flight:', selectedDepartureFlight);
    };

    const handleContinueWithoutBooking = () => {
        sessionStorage.setItem('selectedDepartureFlight', null);
        setSelectedFlight(null);
        console.log('Selected Departure Flight:', null);
    };

    const isNextButtonDisabled = !selectedFlight;

    return (
        <>
            <Navbar />
            <div className="mt-5" style={{ paddingTop: 50 }}>
                <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                    <h1>Available Flights to {selectedDestination}</h1>
                </div>
                <div className="container-fluid mt-3">
                    {flights !== null && flights.length > 0 ? (
                        flights.map((flight, index) => (
                            <div key={index}
                                 className={`destination-option ${selectedFlight === flight ? 'selected-destination' : ''}`}
                                 onClick={() => handleFlightSelect(flight)}>
                                {/* Display flight information as needed */}
                                <p>{flight.airline}</p>
                                <p>{flight.departLocation} to {flight.arriveLocation}</p>
                                <p>${flight.price}</p>
                            </div>
                        ))
                    ) : (
                        <p>No flights available</p>
                    )}
                </div>
                <div className="text-center" style={{ marginTop: 40 }}>
                    <Link to="/flight-from-destination">
                        <button type="submit" className="btn btn-md custom-button" disabled={isNextButtonDisabled}>
                            Book Departure Flight
                        </button>
                    </Link>
                </div>
                <div className="text-center" style={{ marginTop: 40 }}>
                    <Link to="/flight-from-destination">
                        <div className="container-fluid d-flex justify-content-center">
                            <button className="btn btn-link" type="button" onClick={handleContinueWithoutBooking}>
                                Don't want to book a departure flight? CONTINUE HERE
                            </button>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}

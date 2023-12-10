import React, { useState, useEffect } from 'react';
import Navbar from "../../Navbars/Navbar";
import { Link, useNavigate } from 'react-router-dom';
import { app } from '../../Firebase';
import { getFirestore, collection, where, query, getDocs } from 'firebase/firestore';
import Axios from "axios";

export default function CustFlightFromDestination() {
    const [flights, setFlights] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const db = getFirestore(app);

                // Query flights where arriveLocation is equal to selectedDestination in the backend
                const response = await Axios.get(`http://localhost:8080/api/flight/return/${storedDestination}`);
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

    const handleFlightSelectReturn = (selectedReturnFlight) => {
        // Assuming selectedReturnFlight has a unique identifier like flightId
        sessionStorage.setItem('selectedReturnFlightId', selectedReturnFlight.flightId);
        setSelectedFlight(selectedReturnFlight);
        console.log('Selected Return Flight:', selectedReturnFlight);
    };

    const handleContinueWithoutBooking = () => {
        sessionStorage.setItem('selectedReturnFlight', null);
        setSelectedFlight(null);
        console.log('Selected Return Flight:', null);
    };

    const handleCombinedFlight = async () => {
        const selectedDepartureFlightId = sessionStorage.getItem('selectedDepartureFlightId');
        const selectedReturnFlightId = sessionStorage.getItem('selectedReturnFlightId');

        if (selectedDepartureFlightId && selectedReturnFlightId) {
            try {
                const selectedDepartureFlight = await Axios.get(`http://localhost:8080/api/flight/${selectedDepartureFlightId}`);
                const selectedReturnFlight = await Axios.get(`http://localhost:8080/api/flight/${selectedReturnFlightId}`);

                const selectedFlights = [selectedDepartureFlight.data, selectedReturnFlight.data];
                sessionStorage.setItem('selectedFlights', JSON.stringify(selectedFlights));
                console.log('Combined Flight:', selectedFlights);

                navigate('/train');
            } catch (error) {
                console.error('Error fetching flight information:', error);
            }
        } else {
            console.log('Please select both departure and return flights.');
        }
    };





    const isNextButtonDisabled = !selectedFlight;

    return (
        <>
            <Navbar />
            <div className="mt-5" style={{ paddingTop: 50 }}>
                <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                    <h1>Available Flights From {selectedDestination}</h1>
                </div>
                <div className="container-fluid mt-3">
                    {flights !== null && flights.length > 0 ? (
                        flights.map((flight, index) => (
                            <div key={index}
                                 className={`destination-option ${selectedFlight === flight ? 'selected-destination' : ''}`}
                                 onClick={() => handleFlightSelectReturn(flight)}>
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
                    <Link to="/train">
                        <button type="submit" className="btn btn-md custom-button" disabled={isNextButtonDisabled} onClick={handleCombinedFlight}>
                            Book Return Flight
                        </button>
                    </Link>
                </div>
                <div className="text-center" style={{ marginTop: 40 }}>
                    <Link to="/train">
                        <div className="container-fluid d-flex justify-content-center">
                            <button className="btn btn-link" type="button" onClick={handleContinueWithoutBooking}>
                                Don't want to book a return flight? CONTINUE HERE
                            </button>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}

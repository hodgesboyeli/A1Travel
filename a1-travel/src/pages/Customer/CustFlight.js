import React, { useState, useEffect } from 'react';
import Navbar from "../../Navbars/Navbar";
import { Link, useNavigate } from 'react-router-dom';
import { app } from '../../Firebase';
import { getFirestore, collection, where, query, getDocs } from 'firebase/firestore';

export default function CustFlight() {
    const [flights, setFlights] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState(null);
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

    return (
        <>
            <Navbar />
            <div className="mt-5" style={{ paddingTop: 50 }}>
                <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                    <h1>Available Flights to {selectedDestination}</h1>
                </div>
                <div className="container-fluid mt-3">
                    {flights.map((flight, index) => (
                        <div key={index} className="flight-item">
                            {/* Display flight information as needed */}
                            <p>{flight.airline}</p>
                            <p>{flight.departLocation} to {flight.arriveLocation}</p>
                            <p>{/* Add more flight details */}</p>
                        </div>
                    ))}
                </div>
                <div className="text-center" style={{ marginTop: 40 }}>
                    <Link to="/train">
                        <button type="submit" className="btn btn-md custom-button">
                            Book Flight
                        </button>
                    </Link>
                </div>
                <div className="text-center" style={{ marginTop: 40 }}>
                    <Link to="/train">
                        <div className="container-fluid d-flex justify-content-center">
                            <button className="btn btn-link" type="button">
                                Don't want to book a flight? CONTINUE HERE
                            </button>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}

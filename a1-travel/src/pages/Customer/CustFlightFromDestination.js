import React, { useState, useEffect } from 'react';
import Navbar from "../../Navbars/Navbar";
import { Link, useNavigate } from 'react-router-dom';
import Axios from "axios";

export default function CustFlightFromDestination() {
    const [flights, setFlights] = useState([]);
    const [flightIndex, setFlightIndex] = useState(-1);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const navigate = useNavigate();
    const [budget, setBudget] = useState(null);
    const [cartTotal, setCartTotal] = useState(sessionStorage.getItem('cartTotal'));

    useEffect(() => {
        const fetchFlights = async () => {
            try {
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
        const storedDestination = sessionStorage.getItem('selectedDestination');
        const storedBudget = parseFloat(sessionStorage.getItem('budget'));
        const storedCartTotal = parseFloat(sessionStorage.getItem('cartTotal'));


        setSelectedDestination(storedDestination);
        setBudget(storedBudget);
        setCartTotal(storedCartTotal);
        fetchFlights().then();

    }, []);

    useEffect(() => {
        // Update sessionStorage whenever cartTotal changes
        sessionStorage.setItem('cartTotal', cartTotal);
    }, [cartTotal]);

    const handleFlightSelect = (i) => {
        // Assuming selectedReturnFlight has a unique identifier like flightId
        setFlightIndex(i);
        setCartTotal((prev)=>prev + flights[i].price);
        sessionStorage.setItem('cartTotal', cartTotal);
        console.log('Return Flight:', flights[i]);
    };

    const handleContinueWithoutBooking = () => {
        sessionStorage.removeItem('returnFlight');
        console.log('No Flight Set');
    };

    const handleCombinedFlight = (f,i) => {
        if (i >= 0)
            sessionStorage.setItem('returnFlight',JSON.stringify(f[i]));
        navigate('/train');
    };

    return (
        <>
            <Navbar />
            <div className="mt-5" style={{ paddingTop: 50 }}>
                <div className="text-end mr-3" style={{ paddingRight: 50 }}>
                    <p style={{ fontSize: 25 }}>${cartTotal}/{budget}</p>
                </div>
                <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                    <h1>Available Flights From {selectedDestination}</h1>
                </div>
                <div className="container-fluid mt-3">
                    {flights !== null && flights.length > 0 ? (
                        flights.map((flight, index) => (
                            <div key={index}
                                 className={`destination-option ${flightIndex === index && 'selected-destination'}`}
                                 onClick={() => handleFlightSelect(index)}>
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
                    <button type="submit" className="btn btn-md custom-button" disabled={flightIndex < 0}>
                        <Link to="/train-to-destination" onClick={()=> handleCombinedFlight(flights,flightIndex)}>
                            Book Return Flight
                        </Link>
                    </button>
                </div>
                <div className="text-center" style={{ marginTop: 40 }}>
                    <div className="container-fluid d-flex justify-content-center">
                        <Link to="/train-to-destination" onClick={handleContinueWithoutBooking}>
                            <button className="btn btn-link" type="button">
                                Don't want to book a return flight? CONTINUE HERE
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

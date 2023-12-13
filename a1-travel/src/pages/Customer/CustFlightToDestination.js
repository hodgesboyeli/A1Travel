import React, { useState, useEffect } from 'react';
import Navbar from "../../Navbars/Navbar";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import Axios from "axios";

export default function CustFlightToDestination() {
    const { state } = useLocation();
    const [flights, setFlights] = useState([]);
    const [flightIndex, setFlightIndex] = useState(-1);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [budget, setBudget] = useState(null);
    const [cartTotal, setCartTotal] = useState(sessionStorage.getItem('cartTotal'));
    const [editMode, setEditMode] = useState(false);
    const [newBudget, setNewBudget] = useState('');

    useEffect(() => {
        const fetchFlights = async () => {
            try {
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
        const storedBudget = parseFloat(sessionStorage.getItem('budget'));
        const storedCartTotal = parseFloat(sessionStorage.getItem('cartTotal')); // Retrieve cartTotal
        console.log(storedDestination);

        setSelectedDestination(storedDestination);
        setBudget(storedBudget);
        setCartTotal(storedCartTotal);
        fetchFlights().then();
    }, []);

    const handleFlightSelect = (i) => {
        setFlightIndex(i);
        console.log('Departure Flight:', flights[i]);
    };

    const handleFlightSet = (f, i) => {
        if (i >= 0) {
            const flightPrice = parseFloat(f[i].price);
            const updatedCartTotal = parseFloat(cartTotal) + flightPrice;
            setCartTotal(updatedCartTotal);
            sessionStorage.setItem('cartTotal', updatedCartTotal);
            sessionStorage.setItem('departureFlight', JSON.stringify(f[i]));
        }
        console.log('Flight Set');
    };

    const handleFlightSkip = () => {
        sessionStorage.removeItem('departureFlight');
        console.log("No Flight Set");
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
                    <h1>Available Flights to {selectedDestination}</h1>
                </div>
                <div className="container-fluid mt-3">
                    {flights !== null && flights.length > 0 ? (
                        flights.map((flight, index) => (
                            <div key={index}
                                 className={`destination-option ${flightIndex === index && 'selected-destination'}`}
                                 onClick={()=> handleFlightSelect(index)}>
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
                    <button type="submit" className="btn btn-md custom-button" disabled={flightIndex < 0}>
                        <Link to="/flight-from-destination" state={state} onClick={()=> handleFlightSet(flights,flightIndex)}>
                            Book Departure Flight
                        </Link>
                    </button>
                </div>
                <div className="text-center" style={{ marginTop: 40 }}>
                    <div className="container-fluid d-flex justify-content-center">
                        <Link to="/flight-from-destination" state={state} onClick={handleFlightSkip}>
                            <button className="btn btn-link" type="button">
                                Don't want to book a departure flight? CONTINUE HERE
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
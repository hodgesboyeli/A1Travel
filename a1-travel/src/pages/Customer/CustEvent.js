import React, {useEffect, useState} from 'react';
import Navbar from "../../Navbars/Navbar";
import {Link, useNavigate} from "react-router-dom";
import {getFirestore} from "firebase/firestore";
import {app} from "../../Firebase";
import Axios from "axios";

export default function CustEvent(){
    const [events, setEvents] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [eventIndex, setEventIndex] = useState(-1);
    const [lodgingType, setLodgingType] = useState("");
    const navigate = useNavigate();
    const [budget, setBudget] = useState(null);
    const [cartTotal, setCartTotal] = useState(sessionStorage.getItem('cartTotal'));
    const [editMode, setEditMode] = useState(false);
    const [newBudget, setNewBudget] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const db = getFirestore(app);

                // Query events where cityState is equal to storedDestination and the type is equal to storedType in the backend
                const response = await Axios.get(`http://localhost:8080/api/event/?cityState=${storedDestination}`);
                setEvents(response.data.events);
                events.reduce((acc, events) => {
                    acc = {lodgings: []};
                    return acc;
                }, {});
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        // Retrieve selected destination and selected lodging type from session storage
        const storedDestination = sessionStorage.getItem('selectedDestination');
        const storedType = sessionStorage.getItem('lodgingType')
        console.log('Selected destination type:', storedDestination);
        console.log('Selected lodging type:', storedType);

        const storedBudget = parseFloat(sessionStorage.getItem('budget'));
        const storedCartTotal = parseFloat(sessionStorage.getItem('cartTotal')); // Retrieve cartTotal
        console.log(storedDestination);

        setSelectedDestination(storedDestination);
        setBudget(storedBudget);
        setCartTotal(storedCartTotal);
        setSelectedDestination(storedDestination);
        setSelectedDestination(storedDestination);
        setLodgingType(storedType);
        fetchEvents();

    }, []);

    const handleEventSelect = (i) => {
        setEventIndex(i);
        console.log('Event:', events[i]);
    };

    const handleEventSet = (e,i) => {
        if (i >= 0) {
            const eventPrice = parseFloat(e[i].price);
            const updatedCartTotal = parseFloat(cartTotal) + eventPrice;
            setCartTotal(updatedCartTotal);
            sessionStorage.setItem('cartTotal', updatedCartTotal);
            sessionStorage.setItem('event',JSON.stringify(e[i]));
        }
        console.log('Event Set');
    }

    const handleEventSkip = () => {
        sessionStorage.removeItem('event');
        console.log("No Event Set");
    }

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
                    <h1>Choose your Event</h1>
                </div>
                <div className="container-fluid mt-3">
                    {events !== null && events.length > 0 ? (
                        events.map((event, index) => (
                            <div key={index}
                                 className={`destination-option ${eventIndex === index && 'selected-destination'}`}
                                 onClick={() => handleEventSelect(index)}>
                                <p>{event.name}</p>
                                <p>{event.description}</p>
                                <p>{event.address} {event.cityState}</p>
                                <p>Price = ${event.price}.00</p>
                            </div>
                        ))
                    ) : (
                        <p>No events available</p>
                    )}
                </div>
                <div className="text-center" style={{ marginTop: 40 }}>
                    <button type="submit" className="btn btn-md custom-button" onClick={()=> handleEventSet(events,eventIndex)} disabled={eventIndex < 0}>
                        <Link to="/checkout">
                            Next
                        </Link>
                    </button>
                </div>
                <div className="text-center" style={{ marginTop: 40 }}>
                    <div className="container-fluid d-flex justify-content-center">
                        <Link to="/checkout">
                            <button className="btn btn-link" type="button">
                                Don't want any events? CONTINUE HERE
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
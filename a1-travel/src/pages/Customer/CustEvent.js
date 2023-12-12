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
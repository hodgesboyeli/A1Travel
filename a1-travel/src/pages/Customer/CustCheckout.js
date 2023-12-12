import React, {useEffect, useState} from 'react';
import Navbar from "../../Navbars/Navbar";
import {Link} from "react-router-dom";
import Axios from "axios";

export default function CustCheckout(){
    const [destination,setDestination] = useState('');
    const [car, setCar] = useState(null);
    const [lodging, setLodging] = useState(null);
    const [flights, setFlights] = useState([]);
    const [events,setEvents] = useState([]);
    const [trains, setTrains] = useState([]);
    const [view,setView] = useState({
        flight:false
    });
    const [budget,setBudget] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(()=>{
        setBudget(parseFloat(sessionStorage.getItem('budget')));
        setDestination(sessionStorage.getItem('selectedDestination'));
        const f1 = JSON.parse(sessionStorage.getItem('departureFlight'));
        const f2 = JSON.parse(sessionStorage.getItem('returnFlight'));
        setFlights([f1,f2]);
        //TODO needs to be an array of events
        setEvents([JSON.parse(sessionStorage.getItem('event'))]);
        //setLodging(JSON.parse);
    },[]);

    useEffect(() => {
        const totalFlightsCost = flights.reduce((acc, flight) => acc + (flight?.price || 0), 0);
        const totalEventsCost = events.reduce((acc, event) => acc + (event?.price || 0), 0);

        // Add other calculations if needed
        setTotal(totalFlightsCost + totalEventsCost);
    }, [flights, events]);

    /*const toggleFlight = ()=>{
        setView();
    };*/

    const formatNumber = (value) => {
        // Remove all non-digit characters
        const numericValue = value.replace(/[^\d]/g, '');

        // Format the number with commas
        return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const createTrip = async ()=>{
        try {
            const flightID = flights.map((f)=>f.flightId);
            const eventID = events.map((e)=>e.eventId);
            const userResponse = await Axios.get('http://localhost:8080/api/user/email/'+sessionStorage.getItem('email'));
            const user = {
                userId: userResponse.data
            }
            const body = {
                cartTotal:total,
                destination:destination,
                budget:budget,
                flightID:flightID,
                eventID:eventID,
                userID:{
                    userId:userResponse.data.userId
                }
            };
            const response = await Axios.post('http://localhost:8080/api/trip/',body);
        } catch (e){
            console.log('error',e);
        }
    };

    const right = "bi bi-caret-right-fill";
    //const down = "bi bi-caret-down-fill";
    return (
        <>
            <Navbar />
            <div className="container w-75">
                <h1 className="d-flex mt-5 mb-5 justify-content-center">
                    Checkout
                </h1>
                {/*FLIGHTS */}
                <h3 id="flights" className="row align-items-end">
                    <div className="row">
                        <span className="col">
                            <a href='#flights' className='dropdown-arrow p-2'>
                                <i className={`${right}`}/>
                            </a>
                            Flights
                      </span>
                        <span className="col text-end">
                            {/*total for all collapsed items*/}
                        </span>
                    </div>
                    <div className="collapsed row" id="flightCollapse">
                        {flights.length > 0 && flights.map((flight, index)=>(
                            <div>
                                <span>{flight.airline}</span>
                                <span>{flight.departLocation} to {flight.arriveLocation}</span>
                                <span>${flight.price}</span>
                            </div>
                        ))}
                    </div>
                </h3>
                {/*EVENTS */}
                <h3 id="events" className="row align-items-end">
                    <div className="row">
                        <span className="col">
                            <a href='#' className='dropdown-arrow p-2'>
                                <i className={`${right}`}/>
                            </a>
                            Events
                        </span>
                        <span className="col text-end">

                        </span>
                    </div>
                    <div className="row">
                        {events.length > 0 && events.map((event, index)=>(
                            <div key={index}>
                                <span>{event.eventName} - {event.description}</span>
                                <span>${event.price}</span>
                            </div>
                        ))}
                    </div>
                </h3>
                {/*LODGING*/}
                <h3 id="lodging" className="row align-items-end">
                    <div className="row">
                        <span className="col">
                            <a href='#' className='dropdown-arrow p-2'>
                                <i className={`${right}`}/>
                            </a>
                            Lodging
                        </span>
                        <span className="col text-end">

                        </span>
                    </div>
                    <div className="row">
                        Something
                    </div>
                </h3>
                {/*Trains */}
                <h3 id="trains" className="row align-items-end">
                    <div className="row">
                        <span className="col">
                            <a href='#' className='dropdown-arrow p-2'>
                                <i className={`${right}`}/>
                            </a>
                            Trains
                        </span>
                        <span className="col text-end">

                        </span>
                    </div>
                    <div className="row">
                        Something
                    </div>
                </h3>
                {/*EVENTS*/}
                <h3 id="events" className="row align-items-end">
                    <div className="row">
                        <span className="col">
                            <a href='#' className='dropdown-arrow p-2'>
                                <i className={`${right}`}/>
                            </a>
                            Events
                        </span>
                        <span className="col text-end">

                        </span>
                    </div>
                    <div className="row">
                        Something
                    </div>
                </h3>
                {/*TOTAL and Budget row row*/}
                <hr/>
                <div className="row align-items-end">
                    <span className="total col ps-5">
                        Total
                    </span>
                    <span className="total col text-end">
                        ${total}
                    </span>
                </div>
                <div className="row align-items-end">
                    <span className="total col ps-5">
                        Budget
                    </span>
                    <span className="total col text-end">
                        ${budget}.00
                    </span>
                </div>
                {/*Confirm Button*/}
                <div className="text-center">
                    <Link to="/home">
                        <button type="submit" className="btn btn-md custom-button">
                            Confirm Trip
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}
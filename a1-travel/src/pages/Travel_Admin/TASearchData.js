import React, {useRef, useState} from 'react';
import AdminNavbar from '../../Navbars/AdminNavbar';
import Axios, {all} from "axios";
import {getAuth} from "firebase/auth";
import {auth} from "../../Firebase";

export default function TASearchData() {
    const [lodging, setLodging] = useState([]);
    const [lodgingIndex, setLodgingIndex] = useState(-1);
    const [events, setEvents] = useState([]);
    const [eventIndex, setEventIndex] = useState(-1);
    const [cars, setCars] = useState([]);
    const [carIndex, setCarIndex] = useState(-1);
    const [trains, setTrains] = useState([]);
    const [trainIndex, setTrainIndex] = useState(-1);
    const [flights, setFlights] = useState([]);
    const [flightIndex, setFlightIndex] = useState(-1);
    const [showEventForm, setShowEventForm] = useState(false);
    const [showLodgingForm, setShowLodgingForm] = useState(false);
    const [showFlightForm, setShowFlightForm] = useState(false);
    const [showTrainForm, setShowTrainForm] = useState(false);
    const [showCarForm, setShowCarForm] = useState(false);
    const [showTransportationForm, setShowTransportationForm] = useState(false);

    const handleLodging = async () => {
        const response = await Axios.get('http://localhost:8080/api/lodging/');
        setLodging(response.data.lodgings);
    }

    const handleEvents = async () => {
        const response = await Axios.get('http://localhost:8080/api/event/');
        setEvents(response.data.events);
    }

    const handleTrains = async () => {
        const response = await Axios.get('http://localhost:8080/api/train/');
        setTrains(response.data.trains);
    }

    const handleCars = async () => {
        const response = await Axios.get('http://localhost:8080/api/car/');
        setCars(response.data.cars);
    }

    const handleFlights = async () => {
        const response = await Axios.get('http://localhost:8080/api/flight/');
        setFlights(response.data.flights);
    }
    const handleRadioChange = (event) => {
        if (event.target.id === "radioLodging") {
            setShowLodgingForm(true);
            handleLodging();
        } else {
            setShowLodgingForm(false);
        }

        if (event.target.id === "radioEvent") {
            setShowEventForm(true);
            handleEvents();
        } else {
            setShowEventForm(false);
        }

        if (event.target.id === "radioTransportation") {
            setShowTransportationForm(true);
        } else {
            setShowTransportationForm(false);
        }

        if (event.target.id === "radioFlight") {
            handleFlights();
            setShowFlightForm(true);
            setShowTransportationForm(true);
        } else {
            setShowFlightForm(false);
        }

        if (event.target.id === "radioTrain") {
            handleTrains();
            setShowTrainForm(true);
            setShowTransportationForm(true);
        } else {
            setShowTrainForm(false);
        }

        if (event.target.id === "radioCar") {
            handleCars();
            setShowCarForm(true);
            setShowTransportationForm(true);
        } else {
            setShowCarForm(false);
        }
    };

    return (
        <div>
            <AdminNavbar />
            <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                <h1>Search Data </h1>
            </div>

            <div className="container-fluid d-flex justify-content-center">
                <p className="form-check-inline">Search: </p>
                <input
                    className="form-check-input form-check-inline"
                    type="radio"
                    name="Search"
                    id="radioTransportation"
                    onChange={handleRadioChange}
                />
                <label style={{ marginRight: 10 }} htmlFor="radioEvent">
                    Transportation
                </label>
                <input
                    className="form-check-input form-check-inline"
                    type="radio"
                    name="Search"
                    id="radioLodging"
                    onChange={handleRadioChange}
                />
                <label style={{ marginRight: 10 }} htmlFor="radioTransportation">
                    Lodging
                </label>
                <input
                    className="form-check-input form-check-inline"
                    type="radio"
                    name="Search"
                    id="radioEvent"
                    onChange={handleRadioChange}
                />
                <label style={{ marginRight: 10 }} htmlFor="radioEvent">
                    Event
                </label>
            </div>
            {showEventForm && (
                <div className="container-fluid mt-3">
                    {events !== null && events.length > 0 ? (
                        events.map((event, index) => (
                            <div key={index}
                                 className={`destination-option ${eventIndex === index && 'selected-destination'}`}>
                                <p>Event Name: {event.eventName}</p>
                                <p>Description: {event.description}</p>
                                <p>Price Per Ticket: ${event.price}.00</p>
                            </div>
                        ))
                    ) : (
                        <p>No events available</p>
                    )}
                </div>
            )}
            {showLodgingForm && (
                <div className="container-fluid mt-3">
                    {lodging !== null && lodging.length > 0 ? (
                        lodging.map((lodging, index) => (
                            <div key={index}
                                 className={`destination-option ${lodgingIndex === index && 'selected-destination'}`}>
                                <p>Name: {lodging.name}</p>
                                <p>Details: {lodging.details}</p>
                                <p>Lodging Type: {lodging.type}</p>
                                <p>Price Per Night: ${lodging.price}.00</p>
                            </div>
                        ))
                    ) : (
                        <p>No lodging available</p>
                    )}
                </div>
            )}

            {showTransportationForm && (
                <div className="container-fluid d-flex justify-content-center">
                    <p className="form-check-inline">Type: </p>
                    <input
                        className="form-check-input form-check-inline"
                        type="radio"
                        name="Search"
                        id="radioFlight"
                        onChange={handleRadioChange}
                    />
                    <label style={{ marginRight: 10 }} htmlFor="radioEvent">
                        Flight
                    </label>
                    <input
                        className="form-check-input form-check-inline"
                        type="radio"
                        name="Search"
                        id="radioTrain"
                        onChange={handleRadioChange}
                    />
                    <label style={{ marginRight: 10 }} htmlFor="radioTransportation">
                        Train
                    </label>
                    <input
                        className="form-check-input form-check-inline"
                        type="radio"
                        name="Search"
                        id="radioCar"
                        onChange={handleRadioChange}
                    />
                    <label style={{ marginRight: 10 }} htmlFor="radioDestination">
                        Car
                    </label>
                </div>
            )}

            {showTrainForm && (
                <div className="container-fluid mt-3">
                    {trains !== null && trains.length > 0 ? (
                        trains.map((train, index) => (
                            <div key={index}
                                 className={`destination-option ${trainIndex === index && 'selected-destination'}`}>
                                <p>From: {train.departLocation}; To: {train.arriveLocation}</p>
                                <p>Price: ${train.price}.00</p>
                            </div>
                        ))
                    ) : (
                        <p>No trains available</p>
                    )}
                </div>
            )}

            {showCarForm && (
                <div className="container-fluid mt-3">
                    {cars !== null && cars.length > 0 ? (
                        cars.map((car, index) => (
                            <div key={index}
                                 className={`destination-option ${carIndex === index && 'selected-destination'}`}>
                                <p>Car: {car.color} {car.make} {car.model}</p>
                                <p>Price: ${car.price}.00</p>
                            </div>
                        ))
                    ) : (
                        <p>No cars available</p>
                    )}
                </div>
            )}

            {showFlightForm && (
                <div className="container-fluid mt-3">
                    {flights !== null && flights.length > 0 ? (
                        flights.map((flight, index) => (
                            <div key={index}
                                 className={`destination-option ${flightIndex === index && 'selected-destination'}`}>
                                <p>Airline: {flight.airline}</p>
                                <p>From: {flight.departLocation}; To {flight.arriveLocation}</p>
                                <p>Price: ${flight.price}.00</p>
                            </div>
                        ))
                    ) : (
                        <p>No flights available</p>
                    )}
                </div>
            )}
        </div>
    );
}

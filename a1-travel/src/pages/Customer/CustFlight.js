import React, {useState} from 'react';
import Navbar from '../Navbar';
import {Link} from "react-router-dom";

export default function CustFlight() {
    const [flightType, setFlightType] = useState('roundTrip');
    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [passengers, setPassengers] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission logic here
    };

    return (
        <>
        <Navbar/>
        <div className="container mx-auto">
            <h1 className="mt-3 text-center">
                Flight Search
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col">
                        <label htmlFor="departure">Depart</label>
                        <div className="input-group">

                            <input type="text" className="form-control" id="departure" placeholder="Departure city"
                                   value={departure} onChange={(e) => setDeparture(e.target.value)}/>
                        </div>
                    </div>

                    <div className="col">
                        <label htmlFor="arrival">Arrive</label>
                        <div className="input-group">
                            <input type="text" className="form-control" id="arrival" placeholder="Arrival city"
                                   value={arrival} onChange={(e) => setArrival(e.target.value)}/>
                        </div>
                    </div>

                    <div className="col">
                        <div className="mb-3">
                            <label>Flight Type</label>
                            <div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flightType"
                                           id="roundTrip" value="roundTrip"
                                           checked={flightType === 'roundTrip'}
                                           onChange={() => setFlightType('roundTrip')}/>
                                    <label className="form-check-label" htmlFor="roundTrip">Round-trip</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flightType" id="oneWay"
                                           value="oneWay"
                                           checked={flightType === 'oneWay'}
                                           onChange={() => setFlightType('oneWay')}/>
                                    <label className="form-check-label" htmlFor="oneWay">One-way</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="departureDate">Depart Date</label>
                        <input type="date" className="form-control" id="departureDate" value={departureDate}
                               onChange={(e) => setDepartureDate(e.target.value)}/>
                    </div>

                    <div className="col">
                        <label htmlFor="returnDate">Arrive Date</label>
                        <input type="date" className="form-control" id="returnDate" value={returnDate}
                               onChange={(e) => setReturnDate(e.target.value)} disabled={flightType === 'oneWay'}/>
                    </div>

                    <div className="col">
                        <label htmlFor="passengers">Passengers</label>
                        <div className="input-group">
                            <input type="number" className="form-control" id="passengers" min="1" value={passengers}
                                   onChange={(e) => setPassengers(e.target.value)}/>
                        </div>
                    </div>

                    <div className="col d-flex align-items-end mb-1">
                        <button type="submit" className="btn btn-primary btn-sm">
                            Search
                        </button>
                    </div>
                </div>
            </form>
            <Link to="/lodging">
                <button type="submit" className="btn btn-md custom-button" style={{fontSize: 32}}>
                    Next
                </button>
            </Link>
        </div>
        </>
    );
}
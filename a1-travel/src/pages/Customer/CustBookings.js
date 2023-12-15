import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../Navbars/Navbar';
import Axios from 'axios';

export default function CustBookings() {
    const [trips, setTrips] = useState([]);
    const [searchBy, setSearchBy] = useState('');
    const searchQuery = useRef();

    const handleSearchByChange = (event) => {
        setSearchBy(event.target.value);
    };

    const handleSearch = async (e) => {
        e.preventDefault();

    };

    useEffect(() => {
        const fetchTrip = async () => {
            const response = await Axios.get(
                'http://localhost:8080/api/trip/?user=' + sessionStorage.getItem('email')
            );

            setTrips(response.data.trips);
        };
        fetchTrip();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                <h1>Past Trips</h1>
            </div>

            <div className="container-fluid d-flex justify-content-center">
                <p className="form-check-inline">Search By:</p>
                <label style={{ marginRight: 10 }}>
                    <input
                        className="form-check-input form-check-inline"
                        type="radio"
                        value="destination"
                        checked={searchBy === 'destination'}
                        onChange={handleSearchByChange}
                    />
                    Destination
                </label>
                <label style={{ marginRight: 10 }}>
                    <input
                        className="form-check-input form-check-inline"
                        type="radio"
                        value="flight"
                        checked={searchBy === 'flight'}
                        onChange={handleSearchByChange}
                    />
                    Flight
                </label>
                <label style={{ marginRight: 10 }}>
                    <input
                        className="form-check-input form-check-inline"
                        type="radio"
                        value="train"
                        checked={searchBy === 'train'}
                        onChange={handleSearchByChange}
                    />
                    Train
                </label>
                <label style={{ marginRight: 10 }}>
                    <input
                        className="form-check-input form-check-inline"
                        type="radio"
                        value="car"
                        checked={searchBy === 'car'}
                        onChange={handleSearchByChange}
                    />
                    Car
                </label>
                <label style={{ marginRight: 10 }}>
                    <input
                        className="form-check-input form-check-inline"
                        type="radio"
                        value="event"
                        checked={searchBy === 'event'}
                        onChange={handleSearchByChange}
                    />
                    Event
                </label>
            </div>
            <div className="search-bar">
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search"
                        ref={searchQuery}
                    />
                    <button type="submit">
                        <i className="fas fa-search"></i>
                    </button>
                </form>
            </div>
            <div className="d-flex flex-column align-content-center">
                <div className="card-body bg-light">
                    {trips.length === 0 ? (
                        <p>No trips found</p>
                    ) : (
                        <ul className="list-group list-group-flush">
                            {trips.map((trip, index) => (
                                <li key={index} className="list-group-item">
                                    Destination: {trip.destination}, Budget: {trip.budget}, Total Spent: {trip.cartTotal}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
}

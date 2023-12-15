import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../Navbars/Navbar';
import Axios from 'axios';

export default function CustBookings() {
    const [trips, setTrips] = useState([]);
    const [searchBy, setSearchBy] = useState(''); // Set the default search criteria
    const searchQuery = useRef();
    const [filteredTrips, setFilteredTrips] = useState([]);

    useEffect(()=>{
        const fetchTrips = async () => {
            try {
                const response = await Axios.get('http://localhost:8080/api/trip/');
                let data = response.data.trips;


                setTrips(data);
                sessionStorage.setItem('allTrips',JSON.stringify(data));
            } catch (e) {
                console.log('error',e);
            }
        };
        const temp = sessionStorage.getItem('allTrips');
        if (!temp)
            fetchTrips().then();
        else {
            setTrips(prev=> JSON.parse(temp));
            setFilteredTrips([]);
            console.log(trips);
        }
    },[])

    const handleSearchByChange = (event) => {
        setSearchBy(event.target.value);
    };

    const handleSearch = async(e) => {
        e.preventDefault();
        // Perform a Firestore query from backend matching each user's field with a value
        const search = searchQuery.current.value;
        setFilteredTrips(filterTripsByStringMatch(searchBy,search));
    };
    // Filter users based on string value closeness
    const filterTripsByStringMatch = (field, searchString) => {
        // Sort users by the specified field
        const sortedTrips = [...trips].sort((a, b) => {
            if (a[field] < b[field]) return -1;
            if (a[field] > b[field]) return 1;
            return 0;
        });
        // If searchString is provided, filter the sorted users
        if (searchString !== '') {
            return sortedTrips.filter(trip => {
                if (!trip[field]) return false;
                return trip[field].toLowerCase().includes(searchString.toLowerCase());
            });
        }
        return sortedTrips;
    };

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
                                    <p>Destination: {trip.destination}</p>
                                    <p>Budget: {trip.budget}</p>
                                    <p>Total Spent: {trip.cartTotal}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
}

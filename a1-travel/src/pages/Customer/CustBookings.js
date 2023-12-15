import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../Navbars/Navbar';
import Axios from 'axios';

export default function CustBookings() {
    const [trips, setTrips] = useState([]);
    const [searchBy, setSearchBy] = useState('');
    const searchQuery = useRef();
    const [filteredTrips, setFilteredTrips] = useState([]);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await Axios.get('http://localhost:8080/api/trip/');
                let data = response.data.trips;

                setTrips(data);
                sessionStorage.setItem('allTrips', JSON.stringify(data));
            } catch (e) {
                console.log('error', e);
            }
        };

        const temp = sessionStorage.getItem('allTrips');
        if (!temp) {
            fetchTrips();
        } else {
            setTrips(JSON.parse(temp));
            setFilteredTrips([]);
        }
    }, []);

    useEffect(() => {
        console.log('FilteredTrips updated:', filteredTrips);
    }, [filteredTrips]);

    const handleSearchByChange = (event) => {
        setSearchBy(event.target.value);
    };

    // Filter trips based on string value closeness
    const filterTripsByStringMatch = (field, searchString) => {
        // Sort trips by the specified field
        const sortedTrips = [...trips].sort((a, b) => {
            if (a[field] < b[field]) return -1;
            if (a[field] > b[field]) return 1;
            return 0;
        });

        // If searchString is provided, filter based on the field
        if (field !== '') {
            switch (field) {
                case 'destination':
                    // Default search behavior
                    return sortedTrips.filter(trip => {
                        if (!trip[field]) return false;
                        return trip[field].toLowerCase().includes(searchString.toLowerCase());
                    });
                case 'flightID':
                case 'trainID':
                    // Search for 'departLocation' in flights and trains
                    return sortedTrips.filter(trip => {
                        if (!trip[field]) return false;
                        return trip[field]['departLocation'].toLowerCase().includes(searchString.toLowerCase());
                    });
                case 'carID':
                    // Compare 'make' field in cars
                    return sortedTrips.filter(trip => {
                        if (!trip['make']) return false;
                        return trip['make'].toLowerCase().includes(searchString.toLowerCase());
                    });
                case 'eventID':
                    // Search for 'eventName' in events
                    return sortedTrips.filter(trip => {
                        if (!trip['eventName']) return false;
                        return trip['eventName'].toLowerCase().includes(searchString.toLowerCase());
                    });
                default:
                    // Return all trips if field doesn't match any case
                    return sortedTrips;
            }
        }

        return sortedTrips;
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const search = searchQuery.current.value;
        console.log('Searching for:', search, 'by field:', searchBy);

        // If searchString is provided, filter the trips
        if (search !== '') {
            const filtered = filterTripsByStringMatch(searchBy, search);
            console.log('Filtered trips:', filtered);
            setFilteredTrips(filtered);
        } else {
            // If search is empty, set filteredTrips to the full list of trips
            console.log('Search is empty. Setting filteredTrips to all trips.');
            setFilteredTrips(trips);
        }
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
                        value="flightID"
                        checked={searchBy === 'flightID'}
                        onChange={handleSearchByChange}
                    />
                    Flight
                </label>
                <label style={{ marginRight: 10 }}>
                    <input
                        className="form-check-input form-check-inline"
                        type="radio"
                        value="trainID"
                        checked={searchBy === 'trainID'}
                        onChange={handleSearchByChange}
                    />
                    Train
                </label>
                <label style={{ marginRight: 10 }}>
                    <input
                        className="form-check-input form-check-inline"
                        type="radio"
                        value="carID"
                        checked={searchBy === 'carID'}
                        onChange={handleSearchByChange}
                    />
                    Car
                </label>
                <label style={{ marginRight: 10 }}>
                    <input
                        className="form-check-input form-check-inline"
                        type="radio"
                        value="eventID"
                        checked={searchBy === 'eventID'}
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
                    {filteredTrips.length === 0 ? (
                        <p>No trips found</p>
                    ) : (
                        <ul className="list-group list-group-flush">
                            {filteredTrips.map((trip, index) => (
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

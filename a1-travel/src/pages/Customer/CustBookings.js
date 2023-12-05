import React, {useEffect, useState} from 'react';
import Navbar from "../../Navbars/Navbar";
import Axios from "axios";

export default function CustBookings(){
    const [trips, setTrips] = useState([]);
    useEffect(()=>{
        const fetchTrip = async()=>{
            const response = await Axios.get('http://localhost:8080/api/trip/?user=' + sessionStorage.getItem('email'));
            setTrips(response.data.trips);
        };
        fetchTrip().then();
    },[]);
    return (
        <>
            <Navbar/>
            <div className="d-flex flex-column align-content-center">
                <div className="card-body bg-light">
                    <h6 className="card-title">Trips:</h6>
                    <ul className="list-group list-group-flush">
                        {trips.map((trip, index) => (
                            <li key={index} className="list-group-item">
                                Destination: {trip.destination}, Budget: {trip.budget}, Total Spent: {trip.cartTotal}
                                {/* Add more details about flight and car here if needed */}
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </>
    );
}
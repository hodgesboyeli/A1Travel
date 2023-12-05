import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar";
import Axios from "axios";
import {Link} from "react-router-dom";

export default function CustBudgetDestination() {
    const [locations, setLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);

    useEffect(() => {
        async function getDests(){
            try {
                const response = await Axios.get('http://localhost:8080/api/destination/');
                setLocations(response.data.destinations);
                setFilteredLocations(response.data.destinations);
                console.log(locations);
            } catch (error){
                console.error("Error fetching data:",error);
            }
        }
        getDests().then();
    }, [locations]);

    const handleSearch = (searchTerm) => {
        if (searchTerm) {
            const filtered = locations.filter(location =>
                location.location.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredLocations(filtered);
        } else {
            setFilteredLocations(locations);
        }
    };

    return (
        <div>
            <Navbar/>
            <div className="mt-5">
                <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                    <h1>Budget</h1>
                </div>
                <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                    <h1>Destination</h1>
                </div>
                <div className="container-fluid d-flex justify-content-center">
                    <Link to="/lodging">
                        <p>Next</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

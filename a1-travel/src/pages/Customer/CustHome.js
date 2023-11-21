import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar";
import SearchBar from "../../SearchBar";
import Axios from "axios";

export default function CustHome() {
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
    }, []);

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
            <div className="mt-5" style={{paddingTop:50}}>
                <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                    <h1>May your journey begin</h1>
                </div>
                <SearchBar onSearch={handleSearch} />
                <div className="text-center" style={{marginTop: 40}}>
                    <button type="submit" className="btn btn-md custom-button">
                        Create Trip
                        <div><i className="fas fa-plane"></i></div>
                    </button>
                </div>

                <div className="container mt-5">
                    <div className="row">
                        {filteredLocations.map((item, index) => (
                            <div key={index} className="col-md-4 mb-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{item.location}</h5>
                                        <p className="card-text">Some details about {item.location}</p>
                                        <a href="#" className="btn btn-primary">Explore</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

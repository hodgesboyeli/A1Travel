import React, {useEffect, useState} from 'react';
import Navbar from "../../Navbars/Navbar";
import {Link, useNavigate} from "react-router-dom";
import {getFirestore} from "firebase/firestore";
import {app} from "../../Firebase";
import Axios from "axios";

export default function CustAirbnb(){
    const [airbnbs, setAirbnbs] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [lodgingType, setLodgingType] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAirbnbs = async () => {
            try {
                const db = getFirestore(app);

                // Query hotels where cityState is equal to storedDestination and the type is equal to storedType in the backend
                const response = await Axios.get(`http://localhost:8080/api/lodging/cityState/?cityState=${storedDestination}&type=${storedType}`);
                setAirbnbs(response.data.airbnbs);
                airbnbs.reduce((acc, airbnbs) => {
                    acc = {airbnbs: []};
                    return acc;
                }, {});
            } catch (error) {
                console.error('Error fetching airbnbs:', error);
            }
        };

        // Retrieve selected destination and selected lodging type from session storage
        const storedDestination = sessionStorage.getItem('selectedDestination');
        const storedType = sessionStorage.getItem('lodgingType')
        console.log('Selected destination type:', storedDestination);
        console.log('Selected lodging type:', storedType);

        if (storedDestination && storedType) {
            setSelectedDestination(storedDestination);
            setLodgingType(storedType);
            fetchAirbnbs();
        } else {
            // Redirect to the destination selection page if no selected destination is found
            navigate('/lodging');
        }
    }, [lodgingType, selectedDestination, navigate]);
    return (
        <>
            <Navbar />
            <div className="mt-5" style={{ paddingTop: 50 }}>
                <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                    <h1>Choose your Airbnb</h1>
                </div>
                <div className="container-fluid mt-3">
                    {airbnbs !== null && airbnbs.length > 0 ? (
                        airbnbs.map((airbnb, index) => (
                            <div key={index}>
                                <p>{airbnb.address} {airbnb.cityState}</p>
                                <p>Price = ${airbnb.price}.00</p>
                            </div>
                        ))
                    ) : (
                        <p>No airbnbs available</p>
                    )}
                </div>
                <div className="text-center" style={{ marginTop: 40 }}>
                    <Link to="/event">
                        <button type="submit" className="btn btn-md custom-button">
                            Next
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}
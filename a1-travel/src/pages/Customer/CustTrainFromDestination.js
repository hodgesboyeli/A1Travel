import React, {useEffect, useState} from 'react';
import Navbar from "../../Navbars/Navbar";
import {Link, useNavigate} from "react-router-dom";
import {getFirestore} from "firebase/firestore";
import {app} from "../../Firebase";
import Axios from "axios";

export default function CustTrainFromDestination(){
    const [trains, setTrains] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [selectedTrain, setSelectedTrain] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrains = async () => {
            try {
                const db = getFirestore(app);

                // Query trains where arriveLocation is equal to selectedDestination in the backend
                const response = await Axios.get(`http://localhost:8080/api/train/return/${storedDestination}`);
                setTrains(response.data.trains);
                trains.reduce((acc, trains) => {
                    acc = {trains: []};
                    return acc;
                }, {});
            } catch (error) {
                console.error('Error fetching trains:', error);
            }
        };

        // Retrieve selected destination from session storage
        const storedDestination = sessionStorage.getItem('selectedDestination');
        console.log(storedDestination);
        if (storedDestination) {
            setSelectedDestination(storedDestination);
            fetchTrains();
        } else {
            // Redirect to the destination selection page if no selected destination is found
            navigate('/destination');
        }
    }, [selectedDestination, navigate]);

    const handleTrainSelect = (selectedReturnTrain) => {
        sessionStorage.setItem('selectedReturnTrainId', selectedReturnTrain.trainId);
        setSelectedTrain(selectedReturnTrain);
        console.log('Selected Return Train:', selectedReturnTrain);
    };

    const handleContinueWithoutBooking = () => {
        sessionStorage.setItem('selectedReturnTrain', null);
        setSelectedTrain(null);
        console.log('Selected Return Train:', null);
    };


    return (
        <>
            <Navbar />
            <div className="mt-5" style={{ paddingTop: 50 }}>
                <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                    <h1>Available Trains From {selectedDestination}</h1>
                </div>
                <div className="container-fluid mt-3">
                    {trains !== null && trains.length > 0 ? (
                        trains.map((train, index) => (
                            <div key={index}
                                 className={`destination-option ${selectedTrain === train ? 'selected-destination' : ''}`}
                                 onClick={() => handleTrainSelect(train)}>
                                <p>{train.departLocation} to {train.arriveLocation}</p>
                                <p>${train.price}</p>
                            </div>
                        ))
                    ) : (
                        <p>No trains available</p>
                    )}
                </div>
                <div className="mt-5">
                    <div className="text-center" style={{ marginTop: 40 }}>
                        <Link to="/car">
                            <button type="submit" className="btn btn-md custom-button">
                                Next
                            </button>
                        </Link>
                    </div>
                    <div className="text-center" style={{ marginTop: 40 }}>
                        <Link to="/car">
                            <div className="container-fluid d-flex justify-content-center">
                                <button className="btn btn-link" type="button" onClick={handleContinueWithoutBooking}>
                                    Don't want a return train? CONTINUE HERE
                                </button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
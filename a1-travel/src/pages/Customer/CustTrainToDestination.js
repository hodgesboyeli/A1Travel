import React, {useEffect, useState} from 'react';
import Navbar from "../../Navbars/Navbar";
import {Link, useNavigate} from "react-router-dom";
import {getFirestore} from "firebase/firestore";
import {app} from "../../Firebase";
import Axios from "axios";

export default function CustTrainToDestination(){
    const [trains, setTrains] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [trainIndex, setTrainIndex] = useState(-1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrains = async () => {
            try {
                const db = getFirestore(app);

                // Query trains where arriveLocation is equal to selectedDestination in the backend
                const response = await Axios.get(`http://localhost:8080/api/train/arrive/${storedDestination}`);
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

    const handleTrainSelect = (i) => {
        setTrainIndex(i);
        console.log('Departure Train:', trains[i]);
    };

    const handleTrainSet = (t,i) => {
        if (i >= 0)
            sessionStorage.setItem('departureTrain',JSON.stringify(t[i]));
        console.log('Train Set');
    }

    const handleTrainSkip = () => {
        sessionStorage.removeItem('departureTrain');
        console.log("No Train Set");
    }

    return (
        <>
            <Navbar />
            <div className="mt-5" style={{ paddingTop: 50 }}>
                <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                    <h1>Available Trains to {selectedDestination}</h1>
                </div>
                <div className="container-fluid mt-3">
                    {trains !== null && trains.length > 0 ? (
                        trains.map((train, index) => (
                            <div key={index}
                                 className={`destination-option ${trainIndex === index && 'selected-destination'}`}
                                 onClick={() => handleTrainSelect(index)}>
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
                        <button type="submit" className="btn btn-md custom-button" onClick={()=> handleTrainSet(trains,trainIndex)} disabled={trainIndex < 0}>
                            <Link to="/train-from-destination">
                                Book Train
                            </Link>
                        </button>
                    </div>
                    <div className="text-center" style={{ marginTop: 40 }}>
                        <div className="container-fluid d-flex justify-content-center">
                            <Link to="/train-from-destination">
                                <button className="btn btn-link" type="button" onClick={handleTrainSkip}>
                                    Don't want a departure train? CONTINUE HERE
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
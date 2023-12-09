import React, {useEffect, useState} from 'react';
import Navbar from "../../Navbars/Navbar";
import {Link, useNavigate} from "react-router-dom";
import {getFirestore} from "firebase/firestore";
import {app} from "../../Firebase";
import Axios from "axios";

export default function CustTrain(){
    const [trains, setTrains] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrains = async () => {
            try {
                const db = getFirestore(app);

                // Query trains where arriveLocation is equal to selectedDestination in the backend
                const response = await Axios.get(`http://localhost:8080/api/train/${storedDestination}`);
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
    return (
        <>
            <Navbar />
            <div className="mt-5" style={{ paddingTop: 50 }}>
                <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                    <h1>Available Trains to {selectedDestination}</h1>
                </div>
                <div className="container-fluid mt-3">
                    {trains.map((train, index) => (
                        <div key={index} className="train-item">
                             {/*Display train information as needed*/}
                            {/*<p>{train.departTime.toDate().toLocaleDateString()}</p>*/}
                            <p>{train.departLocation} to {train.arriveLocation}</p>
                            <p>{/* Add more train details */}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-5" style={{ paddingTop: 50 }}>
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
                                <button className="btn btn-link" type="button">
                                    Don't want a train? CONTINUE HERE
                                </button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
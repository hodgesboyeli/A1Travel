import React, {useEffect, useState} from 'react';
import Navbar from "../../Navbars/Navbar";
import {Link, useNavigate} from "react-router-dom";
import {getFirestore} from "firebase/firestore";
import {app} from "../../Firebase";
import Axios from "axios";

export default function CustTrainFromDestination(){
    const [trains, setTrains] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [trainIndex, setTrainIndex] = useState(-1);
    const navigate = useNavigate();
    const [budget, setBudget] = useState(null);
    const [cartTotal, setCartTotal] = useState(sessionStorage.getItem('cartTotal'));

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

        const storedDestination = sessionStorage.getItem('selectedDestination');
        const storedBudget = parseFloat(sessionStorage.getItem('budget'));
        const storedCartTotal = parseFloat(sessionStorage.getItem('cartTotal')); // Retrieve cartTotal
        console.log(storedDestination);

        setSelectedDestination(storedDestination);
        setBudget(storedBudget);
        setCartTotal(storedCartTotal);
        setSelectedDestination(storedDestination);
        fetchTrains();

    }, []);

    const handleTrainSelect = (i) => {
        setTrainIndex(i);
        console.log('Return Train:', trains[i]);
    };

    const handleTrainSet = (t,i) => {
        if (i >= 0)
            sessionStorage.setItem('returnTrain',JSON.stringify(t[i]));
        console.log('Train Set');
    }

    const handleCombinedTrain = (t, i) => {
        if (i >= 0) {
            const trainPrice = parseFloat(t[i].price);
            const updatedCartTotal = parseFloat(cartTotal) + trainPrice;
            setCartTotal(updatedCartTotal);
            sessionStorage.setItem('cartTotal', updatedCartTotal);
            sessionStorage.setItem('returnTrain',JSON.stringify(t[i]));
        }

        navigate('/car');
    };

    const handleTrainSkip = () => {
        sessionStorage.removeItem('returnTrain');
        console.log("No Train Set");
    }


    return (
        <>
            <Navbar />
            <div className="mt-5" style={{ paddingTop: 50 }}>
                <div className="text-end mr-3" style={{ paddingRight: 50 }}>
                    <p style={{ fontSize: 25, color: budget < 0 ? 'green' : cartTotal <= budget ? 'green' : 'red' }}>
                        ${cartTotal}/{budget < 0 ? '∞' : budget}
                    </p>
                </div>

                <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                    <h1>Available Trains From {selectedDestination}</h1>
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
                        <button type="submit" className="btn btn-md custom-button" onClick={()=> handleCombinedTrain(trains,trainIndex)} disabled={trainIndex < 0}>
                            <Link to="/car">
                                    Book Return Train
                            </Link>
                        </button>
                    </div>
                    <div className="text-center" style={{ marginTop: 40 }}>
                        <div className="container-fluid d-flex justify-content-center">
                            <Link to="/car">
                                <button className="btn btn-link" type="button" onClick={handleTrainSkip}>
                                    Don't want a return train? CONTINUE HERE
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
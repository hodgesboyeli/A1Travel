import React, {useEffect, useState} from 'react';
import Navbar from "../../Navbars/Navbar";
import {Link} from "react-router-dom";
import {getFirestore} from "firebase/firestore";
import {app} from "../../Firebase";
import Axios from "axios";

export default function CustLodging(){

    const [budget, setBudget] = useState(null);
    const [cartTotal, setCartTotal] = useState(sessionStorage.getItem('cartTotal'));

    useEffect(() => {

        const storedBudget = parseFloat(sessionStorage.getItem('budget'));
        const storedCartTotal = parseFloat(sessionStorage.getItem('cartTotal')); // Retrieve cartTotal

        setBudget(storedBudget);
        setCartTotal(storedCartTotal);

    }, []);

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
                    <h1>Where would you like to stay</h1>
                </div>
                <div className="mt-5">
                    <div className="text-center">
                        <Link to="/hotel" onClick={() => sessionStorage.setItem('lodgingType', "Hotel")}>
                            <button type="submit" className="btn btn-md custom-button" style={{ fontSize: 40, paddingLeft: 300, paddingRight: 300, backgroundColor: "#1E71EE" }}>
                                Hotel
                            </button>
                        </Link>
                    </div>
                    <div className="text-center" style={{ marginTop: 40 }}>
                        <Link to="/airbnb" onClick={() => sessionStorage.setItem('lodgingType', "Airbnb")}>
                            <button type="submit" className="btn btn-md custom-button" style={{ fontSize: 40, paddingLeft: 300, paddingRight: 300 }}>
                                Airbnb
                            </button>
                        </Link>
                    </div>
                    <div className="text-center" style={{ marginTop: 40 }}>
                        <Link to="/event">
                            <div className="container-fluid d-flex justify-content-center">
                                <button className="btn btn-link" type="button">
                                    Have a place to stay? CONTINUE HERE
                                </button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
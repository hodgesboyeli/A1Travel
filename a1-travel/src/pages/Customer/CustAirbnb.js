import React, {useEffect, useState} from 'react';
import Navbar from "../../Navbars/Navbar";
import {Link, useNavigate} from "react-router-dom";
import {getFirestore} from "firebase/firestore";
import {app} from "../../Firebase";
import Axios from "axios";

export default function CustAirbnb(){
    const [airbnbs, setAirbnbs] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [airbnbIndex, setAirbnbIndex] = useState(-1);
    const [lodgingType, setLodgingType] = useState("");
    const navigate = useNavigate();
    const [budget, setBudget] = useState(null);
    const [cartTotal, setCartTotal] = useState(sessionStorage.getItem('cartTotal'));

    useEffect(() => {
        const fetchAirbnbs = async () => {
            try {
                const db = getFirestore(app);

                // Query airbnbs where cityState is equal to storedDestination and the type is equal to storedType in the backend
                const response = await Axios.get(`http://localhost:8080/api/lodging/cityState/?cityState=${storedDestination}&type=${storedType}`);
                setAirbnbs(response.data.lodgings);
                airbnbs.reduce((acc, airbnbs) => {
                    acc = {lodgings: []};
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

        const storedBudget = parseFloat(sessionStorage.getItem('budget'));
        const storedCartTotal = parseFloat(sessionStorage.getItem('cartTotal')); // Retrieve cartTotal
        console.log(storedDestination);

        setSelectedDestination(storedDestination);
        setBudget(storedBudget);
        setCartTotal(storedCartTotal);
        setSelectedDestination(storedDestination);
        setSelectedDestination(storedDestination);
        setLodgingType(storedType);
        fetchAirbnbs();

    }, []);

    const handleAirbnbSelect = (i) => {
        setAirbnbIndex(i);
        console.log('Airbnb:', airbnbs[i]);
    };

    const handleAirbnbSet = (a,i) => {
        if (i >= 0) {
            const airbnbPrice = parseFloat(a[i].price);
            const updatedCartTotal = parseFloat(cartTotal) + airbnbPrice;
            setCartTotal(updatedCartTotal);
            sessionStorage.setItem('cartTotal', updatedCartTotal);
            sessionStorage.setItem('airbnb', JSON.stringify(a[i]));
        }
        console.log('Airbnb Set');
    }

    const handleAirbnbSkip = () => {
        sessionStorage.removeItem('airbnb');
        console.log("No Airbnb Set");
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
                    <h1>Choose your Airbnb</h1>
                </div>
                <div className="container-fluid mt-3">
                    {airbnbs !== null && airbnbs.length > 0 ? (
                        airbnbs.map((airbnb, index) => (
                            <div key={index}
                                 className={`destination-option ${airbnbIndex === index && 'selected-destination'}`}
                                 onClick={() => handleAirbnbSelect(index)}>
                                <p>{airbnb.address} {airbnb.cityState}</p>
                                <p>{airbnb.details}</p>
                                <p>Price = ${airbnb.price}.00</p>
                            </div>
                        ))
                    ) : (
                        <p>No airbnbs available</p>
                    )}
                </div>
                <div className="text-center" style={{ marginTop: 40 }}>
                    <Link to="/event">
                        <button type="submit" className="btn btn-md custom-button" onClick={()=> handleAirbnbSet(airbnbs,airbnbIndex)} disabled={airbnbIndex < 0}>
                            Next
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}
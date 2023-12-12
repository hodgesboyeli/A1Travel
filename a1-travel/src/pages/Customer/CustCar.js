import React, {useEffect, useState} from 'react';
import Navbar from "../../Navbars/Navbar";
import {Link, useNavigate} from "react-router-dom";
import {getFirestore} from "firebase/firestore";
import {app} from "../../Firebase";
import Axios from "axios";

export default function CustCar(){
    const [cars, setCars] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [carIndex, setCarIndex] = useState(-1);
    const navigate = useNavigate();
    const [budget, setBudget] = useState(null);
    const [cartTotal, setCartTotal] = useState(sessionStorage.getItem('cartTotal'));

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const db = getFirestore(app);

                // Query cars where pickupLocation is equal to selectedDestination in the backend
                const response = await Axios.get(`http://localhost:8080/api/car/${storedDestination}`);
                setCars(response.data.cars);
                cars.reduce((acc, cars) => {
                    acc = {cars: []};
                    return acc;
                }, {});
            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        };

        // Retrieve selected destination from session storage
        const storedDestination = sessionStorage.getItem('selectedDestination');
        const storedBudget = parseFloat(sessionStorage.getItem('budget'));
        const storedCartTotal = parseFloat(sessionStorage.getItem('cartTotal')); // Retrieve cartTotal
        console.log(storedDestination);

        setSelectedDestination(storedDestination);
        setBudget(storedBudget);
        setCartTotal(storedCartTotal);
        setSelectedDestination(storedDestination);

    }, []);

    const handleCarSelect = (i) => {
        setCarIndex(i);
        console.log('Car:', cars[i]);
    };

    const handleCarSet = (c,i) => {
        if (i >= 0) {
            const carPrice = parseFloat(c[i].price);
            const updatedCartTotal = parseFloat(cartTotal) + carPrice;
            setCartTotal(updatedCartTotal);
            sessionStorage.setItem('cartTotal', updatedCartTotal);
            sessionStorage.setItem('car',JSON.stringify(c[i]));
        }
        console.log('Car Set');
    }

    const handleCarSkip = () => {
        sessionStorage.removeItem('car');
        console.log("No Car Set");
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
                    <h1>Choose your Car</h1>
                </div>
                <div className="container-fluid mt-3">
                    {cars !== null && cars.length > 0 ? (
                        cars.map((car, index) => (
                            <div key={index}
                                 className={`destination-option ${carIndex === index && 'selected-destination'}`}
                                 onClick={() => handleCarSelect(index)}>
                                <p>{car.color} {car.make} {car.model}</p>
                                <p>Price = ${car.price}.00</p>
                            </div>
                        ))
                    ) : (
                        <p>No cars available</p>
                    )}
                </div>
                <div className="text-center" style={{ marginTop: 40 }}>
                        <button type="submit" className="btn btn-md custom-button" onClick={()=> handleCarSet(cars,carIndex)} disabled={carIndex < 0}>
                            <Link to="/lodging">
                                Rent Car
                            </Link>
                        </button>
                </div>
                <div className="text-center" style={{ marginTop: 40 }}>
                    <div className="container-fluid d-flex justify-content-center">
                        <Link to="/lodging">
                            <button className="btn btn-link" type="button" onClick={handleCarSkip}>
                                Don't want to rent a car? CONTINUE HERE
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
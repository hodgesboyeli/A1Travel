import React, {useEffect, useState} from 'react';
import Navbar from "../../Navbars/Navbar";
import {Link, useNavigate} from "react-router-dom";
import {getFirestore} from "firebase/firestore";
import {app} from "../../Firebase";
import Axios from "axios";

export default function CustCar(){
    const [cars, setCars] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [selectedCar, setSelectedCar] = useState(null);
    const navigate = useNavigate();

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
        console.log(storedDestination);
        if (storedDestination) {
            setSelectedDestination(storedDestination);
            fetchCars();
        } else {
            // Redirect to the destination selection page if no selected destination is found
            navigate('/destination');
        }
    }, [selectedDestination, navigate]);

    const handleCarSelect = (selectedCar) => {
        sessionStorage.setItem('selectedCar', selectedCar.trainId);
        setSelectedCar(selectedCar);
        console.log('Selected Car:', selectedCar);
    };

    const handleContinueWithoutBooking = () => {
        sessionStorage.setItem('selectedCar', null);
        setSelectedCar(null);
        console.log('Selected Car:', null);
    };

    return (
        <>
            <Navbar />
            <div className="mt-5" style={{ paddingTop: 50 }}>
                <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                    <h1>Choose your Car</h1>
                </div>
                <div className="container-fluid mt-3">
                    {cars !== null && cars.length > 0 ? (
                        cars.map((car, index) => (
                            <div key={index}
                                 className={`destination-option ${selectedCar === car ? 'selected-destination' : ''}`}
                                 onClick={() => handleCarSelect(car)}>
                                <p>{car.color} {car.make} {car.model}</p>
                                <p>Price = ${car.price}.00</p>
                            </div>
                        ))
                    ) : (
                        <p>No cars available</p>
                    )}
                </div>
                <div className="text-center" style={{ marginTop: 40 }}>
                    <Link to="/lodging">
                        <button type="submit" className="btn btn-md custom-button">
                            Next
                        </button>
                    </Link>
                </div>
                <div className="text-center" style={{ marginTop: 40 }}>
                    <Link to="/lodging">
                        <div className="container-fluid d-flex justify-content-center">
                            <button className="btn btn-link" type="button" onClick={handleContinueWithoutBooking}>
                                Don't want to rent a car? CONTINUE HERE
                            </button>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}
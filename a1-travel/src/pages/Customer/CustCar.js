import React, {useEffect, useState} from 'react';
import Navbar from "../../Navbars/Navbar";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {getFirestore} from "firebase/firestore";
import {app} from "../../Firebase";
import Axios from "axios";

export default function CustCar(){
    const {state} = useLocation();
    const [cars, setCars] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [carIndex, setCarIndex] = useState(-1);
    const navigate = useNavigate();
    const [budget, setBudget] = useState(null);
    const [cartTotal, setCartTotal] = useState(sessionStorage.getItem('cartTotal'));
    const [editMode, setEditMode] = useState(false);
    const [newBudget, setNewBudget] = useState('');

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
        fetchCars();
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

    const handleEditClick = () => {
        // Toggle the editMode value
        setEditMode((prevEditMode) => !prevEditMode);
    };

    const formatNumber = (value) => {
        // Remove all non-digit characters
        const numericValue = value.replace(/[^\d]/g, '');

        // Format the number with commas
        return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleBudgetChange = (e) => {
        setNewBudget(formatNumber(e.target.value));
    };

    const handleSaveClick = () => {
        // Validate and save the new budget
        const newBudgetValue = parseFloat(newBudget.replace(/,/g, ''));
        if (!isNaN(newBudgetValue) && newBudgetValue >= 0) {
            sessionStorage.setItem('budget', newBudgetValue);
            setBudget(newBudgetValue);
            setEditMode(false);
        } else {
            // Handle invalid input (optional)
            console.log('Invalid budget input');
            // You can show an error message to the user if needed
        }
    };

    const handleRemoveBudget = () => {
        sessionStorage.setItem('budget', -1);
        setBudget(-1);
        setEditMode(false);
    };

    return (
        <>
            <Navbar />
            <div className="mt-5" style={{ paddingTop: 50 }}>
                <div className="text-end mr-3" style={{ paddingRight: 50 }}>
                    <p style={{ fontSize: 25, color: budget < 0 ? 'green' : cartTotal <= budget ? 'green' : 'red' }}>
                        <button type="button" className="edit-button btn-md" onClick={handleEditClick}>
                            <i className="fas fa-edit"></i>
                        </button>
                        ${cartTotal}/{budget < 0 ? '∞' : budget}
                    </p>
                    {editMode && (
                        <div className="d-flex flex-column align-items-end mb-3">
                            <div className="d-flex mb-2">
                                <input
                                    type="text"
                                    value={newBudget}
                                    onChange={handleBudgetChange}
                                    className="form-control me-2"
                                    style={{ maxWidth: '145px' }}
                                    placeholder="Enter new budget"
                                />
                                <button onClick={handleSaveClick} className="btn btn-success">Save</button>
                            </div>
                            <button onClick={handleRemoveBudget} className="btn btn-secondary" style={{ width: '232px' }}>Remove Budget</button>
                        </div>
                    )}
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
                            <Link to={(state!=null && state.from==='car') ? '/checkout' : '/car'}>
                                Rent Car
                            </Link>
                        </button>
                </div>
                <div className="text-center" style={{ marginTop: 40 }}>
                    <div className="container-fluid d-flex justify-content-center">
                        <Link to={(state!=null && state.from==='car') ? '/checkout' : '/car'}z>
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
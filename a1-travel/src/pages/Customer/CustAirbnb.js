import React, {useEffect, useState} from 'react';
import Navbar from "../../Navbars/Navbar";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Axios from "axios";

export default function CustAirbnb(){
    const {state} = useLocation();
    const [airbnbs, setAirbnbs] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [airbnbIndex, setAirbnbIndex] = useState(-1);
    const navigate = useNavigate();
    const [budget, setBudget] = useState(null);
    const [cartTotal, setCartTotal] = useState(sessionStorage.getItem('cartTotal'));
    const [editMode, setEditMode] = useState(false);
    const [newBudget, setNewBudget] = useState('');

    useEffect(() => {
        const fetchAirbnbs = async () => {
            try {
                // Query airbnbs where cityState is equal to storedDestination and the type is equal to storedType in the backend
                const response = await Axios.get(`http://localhost:8080/api/lodging/cityState/?cityState=${storedDestination}&type=Airbnb`);
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
        console.log('Selected destination type:', storedDestination);

        const storedBudget = parseFloat(sessionStorage.getItem('budget'));
        const storedCartTotal = parseFloat(sessionStorage.getItem('cartTotal')); // Retrieve cartTotal
        console.log(storedDestination);

        setSelectedDestination(storedDestination);
        setBudget(storedBudget);
        setCartTotal(storedCartTotal);
        setSelectedDestination(storedDestination);
        setSelectedDestination(storedDestination);
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
            sessionStorage.setItem('lodging', JSON.stringify(a[i]));
        }
        console.log('Airbnb Set');
        navigate(state.from === 'lodging' ? "/checkout" : '/event',{state:state});
    }

    const handleAirbnbSkip = () => {
        sessionStorage.removeItem('lodging');
        console.log("No Airbnb Set");
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
                    <h1>Choose your Airbnb</h1>
                </div>
                <div className="container-fluid mt-3">
                    {airbnbs !== null && airbnbs.length > 0 ? (
                        airbnbs.map((airbnb, index) => (
                            <div key={index}
                                 className={`destination-option ${airbnbIndex === index && 'selected-destination'}`}
                                 onClick={() => handleAirbnbSelect(index)}>
                                <p>Name: {airbnb.name}</p>
                                <p>Address: {airbnb.address} {airbnb.cityState}</p>
                                <p>Details: {airbnb.details}</p>
                                <p>Price Per Night: ${airbnb.price}.00</p>
                            </div>
                        ))
                    ) : (
                        <p>No airbnbs available</p>
                    )}
                </div>
                <div className="text-center" style={{ marginTop: 40 }}>
                    <button type="submit" className="btn btn-md custom-button" onClick={()=> handleAirbnbSet(airbnbs,airbnbIndex)} disabled={airbnbIndex < 0}>
                            Next
                    </button>
                </div>
                <div className="text-center" style={{ marginTop: 40 }}>
                        <div className="container-fluid d-flex justify-content-center">
                            <button className="btn btn-link" type="button" onClick={handleAirbnbSkip}>
                                <Link to="/lodging" state={state}>
                                Go back
                                </Link>
                            </button>
                        </div>
                </div>
            </div>
        </>
    );
}
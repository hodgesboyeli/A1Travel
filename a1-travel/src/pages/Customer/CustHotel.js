import React, {useEffect, useState} from 'react';
import Navbar from "../../Navbars/Navbar";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {getFirestore} from "firebase/firestore";
import {app} from "../../Firebase";
import Axios from "axios";

export default function CustHotel(){
    const {state} = useLocation();
    const [hotels, setHotels] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [hotelIndex, setHotelIndex] = useState(-1);
    const [lodgingType, setLodgingType] = useState("");
    const navigate = useNavigate();
    const [budget, setBudget] = useState(null);
    const [cartTotal, setCartTotal] = useState(sessionStorage.getItem('cartTotal'));
    const [editMode, setEditMode] = useState(false);
    const [newBudget, setNewBudget] = useState('');

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const db = getFirestore(app);

                // Query hotels where cityState is equal to storedDestination and the type is equal to storedType in the backend
                const response = await Axios.get(`http://localhost:8080/api/lodging/cityState/?cityState=${storedDestination}&type=${storedType}`);
                setHotels(response.data.lodgings);
                hotels.reduce((acc, hotels) => {
                    acc = {lodgings: []};
                    return acc;
                }, {});
            } catch (error) {
                console.error('Error fetching hotels:', error);
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
        fetchHotels();

    }, []);

    const handleHotelSelect = (i) => {
        setHotelIndex(i);
        console.log('Hotel:', hotels[i]);
    };

    const handleHotelSet = (h,i) => {
        if (i >= 0){
            const hotelPrice = parseFloat(h[i].price);
            const updatedCartTotal = parseFloat(cartTotal) + hotelPrice;
            setCartTotal(updatedCartTotal);
            sessionStorage.setItem('cartTotal', updatedCartTotal);
            sessionStorage.setItem('hotel',JSON.stringify(h[i]));
        }
        console.log('Hotel Set');
    }

    const handleHotelSkip = () => {
        sessionStorage.removeItem('hotel');
        console.log("No Hotel Set");
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
                    <h1>Choose your Hotel</h1>
                </div>
                <div className="container-fluid mt-3">
                    {hotels !== null && hotels.length > 0 ? (
                        hotels.map((hotel, index) => (
                            <div key={index}
                                 className={`destination-option ${hotelIndex === index && 'selected-destination'}`}
                                 onClick={() => handleHotelSelect(index)}>
                                <p>Hotel Name: {hotel.name}</p>
                                <p>Address: {hotel.address} {hotel.cityState}</p>
                                <p>Details: {hotel.details}</p>
                                <p>Price Per Night: ${hotel.price}.00</p>
                            </div>
                        ))
                    ) : (
                        <p>No hotels available</p>
                    )}
                </div>
                <div className="text-center" style={{ marginTop: 40 }}>
                    <button type="submit" className="btn btn-md custom-button" onClick={()=> handleHotelSet(hotels,hotelIndex)} disabled={hotelIndex < 0}>
                        <Link to={(state!=null && state.from==='lodging') ? '/checkout' : '/event'}>
                            Next
                        </Link>
                    </button>
                </div>
                <div className="text-center" style={{ marginTop: 40 }}>
                    <Link to="/lodging" state={ state }>
                        <div className="container-fluid d-flex justify-content-center">
                            <button className="btn btn-link" type="button">
                                Go back
                            </button>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}
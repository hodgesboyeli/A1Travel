import React, {useEffect, useState} from 'react';
import Navbar from "../../Navbars/Navbar";
import {Link, useNavigate} from "react-router-dom";
import {getFirestore} from "firebase/firestore";
import {app} from "../../Firebase";
import Axios from "axios";

export default function CustHotel(){
    const [hotels, setHotels] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [hotelIndex, setHotelIndex] = useState(-1);
    const [lodgingType, setLodgingType] = useState("");
    const navigate = useNavigate();
    const [budget, setBudget] = useState(null);
    const [cartTotal, setCartTotal] = useState(sessionStorage.getItem('cartTotal'));

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

    return (
        <>
            <Navbar />
            <div className="mt-5" style={{ paddingTop: 50 }}>
                <div className="text-end mr-3" style={{ paddingRight: 50 }}>
                    <p style={{ fontSize: 25, color: cartTotal <= budget ? 'green' : 'red' }}>
                        ${cartTotal}/{budget}
                    </p>
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
                                <p>{hotel.address} {hotel.cityState}</p>
                                <p>{hotel.details}</p>
                                <p>Price = ${hotel.price}.00</p>
                            </div>
                        ))
                    ) : (
                        <p>No hotels available</p>
                    )}
                </div>
                <div className="text-center" style={{ marginTop: 40 }}>
                    <Link to="/event">
                        <button type="submit" className="btn btn-md custom-button" onClick={()=> handleHotelSet(hotels,hotelIndex)} disabled={hotelIndex < 0}>
                            Next
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}
import React, {useEffect, useState} from 'react';
import Navbar from "../../Navbars/Navbar";
import {Link} from "react-router-dom";

export default function CustCheckout(){
    const [car, setCar] = useState(null);
    const [lodging, setLodging] = useState(null);
    const [flights, setFlights] = useState([]);
    const [events,setEvents] = useState([]);
    const [trains, setTrains] = useState([]);

    /*useEffect(()=>{

    },[]);*/

    return (
        <>
            <Navbar />
            <div className="" >
                <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                    <h1>Checkout</h1>
                </div>
                <div className="text-center" style={{ marginTop: 40 }}>
                    <Link to="/home">
                        <button type="submit" className="btn btn-md custom-button">
                            Confirm Trip
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}
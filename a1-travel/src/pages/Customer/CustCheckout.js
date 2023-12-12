import React/*, {useState}*/, {useEffect, useState} from 'react';
import Navbar from "../../Navbars/Navbar";
import {Link} from "react-router-dom";
import {array} from "mdb-ui-kit/src/js/mdb/util";

export default function CustCheckout(){
    const [car, setCar] = useState(null);
    const [lodging, setLodging] = useState(null);
    const [flights, setFlights] = useState([]);
    const [events,setEvents] = useState([]);
    const [trains, setTrains] = useState([]);
    const [view,setView] = useState({
        flight:false
    });

    useEffect(()=>{

    },[]);

    /*const toggleFlight = ()=>{
        setView();
    };*/

    const right = "bi bi-caret-right-fill";
    //const down = "bi bi-caret-down-fill";
    return (
        <>
            <Navbar />
            <div className="container w-75">
                <h1 className="d-flex mt-5 mb-5 justify-content-center">
                    Checkout
                </h1>
                {/*FLIGHTS */}
                <h3 id="flights" className="row align-items-end">
                    <div className="row">

                    <span className="col">
                        <a href='#flights' className='dropdown-arrow p-2'>
                            <i className={`${right}`}/>
                        </a>
                        Flights
                    </span>
                        <span className="col text-end">

                    </span>
                    </div>
                    <div className="collapsed row" id="flightCollapse">
                        Something
                    </div>
                </h3>
                {/*EVENTS */}
                <h3 id="events" className="row align-items-end">
                    <div className="row">
                        <span className="col">
                            <a href='#' className='dropdown-arrow p-2'>
                                <i className={`${right}`}/>
                            </a>
                            Flights
                        </span>
                        <span className="col text-end">

                        </span>
                    </div>
                    <div className="row">
                        Something
                    </div>
                </h3>
                {/*TOTAL row*/}
                <hr/>
                <div className="row align-items-end">
                    <span className="total col ps-5">
                        Total
                    </span>
                    <span className="total col text-end">
                        $456.00
                    </span>
                </div>
                {/*Confirm Button*/}
                <div className="text-center">
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
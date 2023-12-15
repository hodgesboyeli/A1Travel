import React, {useEffect, useState} from 'react';
import Navbar from "../../Navbars/Navbar";
import {Link, useNavigate} from "react-router-dom";
import Axios from "axios";

export default function CustCheckout(){
    const navigate = useNavigate();
    const [items, setItems] = useState({
        budget:0,
        total:0,
        destination:'',
        car:{},
        lodging:{},
        flights:[],
        events:[],
        trains:[]
    });
    const [view,setView] = useState(
        {
            flight:false,
            event:false,
            train:false
    });

    useEffect(()=>{
        let updatedItems = {};
        //set budget and destination and total
        updatedItems.total = parseFloat(sessionStorage.getItem('cartTotal'));
        console.log(updatedItems.total);
        updatedItems.budget = parseFloat(sessionStorage.getItem('budget'));
        updatedItems.destination = sessionStorage.getItem('selectedDestination');
        //set Lodging
        const l = sessionStorage.getItem('lodging');
        if (l)
            updatedItems.lodging = JSON.parse(l);
        //set flights
        let f = [];
        const f1 = sessionStorage.getItem('departureFlight');
        if (f1)
            f.push(JSON.parse(f1));
        const f2 = sessionStorage.getItem('returnFlight');
        if (f2)
            f.push(JSON.parse(f2));
        updatedItems.flights = f;
        //set events if filled
        const e = sessionStorage.getItem('event');
        if (e)
            updatedItems.events = JSON.parse(e);
        //set trains
        let t = [];
        const t1 = sessionStorage.getItem('departureTrain');
        if (t1)
            t.push(JSON.parse(t1));
        const t2 = sessionStorage.getItem('returnTrain');
        if (t2)
            t.push(JSON.parse(t2));
        updatedItems.trains = t;
        /*const totalFlightsCost = updatedItems.flights ? updatedItems.flights.reduce((acc, flight) => acc + (flight?.price || 0), 0) : 0;
        const totalEventsCost = updatedItems.events ? updatedItems.events.reduce((acc, event) => acc + (event?.price || 0), 0) : 0;
        const totalTrainsCost = updatedItems.trains ? updatedItems.trains.reduce((acc, event) => acc + (event?.price || 0), 0) : 0;
        updatedItems.total = totalTrainsCost+totalEventsCost+totalFlightsCost+
            (updatedItems.lodging ? updatedItems.lodging.price : 0)+
            (updatedItems.car ? updatedItems.car.price : 0);*/
        setItems(updatedItems);
    },[]);

    const formatNumber = (num)=>{
        if (num)
            return num.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return '0';
    }

    const createTrip = async ()=>{
        try {
            const flightID = items.flights ? items.flights.map(f => ({flightId: f.flightId})) : null;
            const eventID = items.events ? items.events.map(e => ({eventId: e.eventId})) : null;
            const trainID = items.trains ? items.trains.map(t => ({trainId: t.trainId})) : null;
            //get userID
            const userResponse = await Axios.get('http://localhost:8080/api/user/email/'+sessionStorage.getItem('email'));
            const user = {userId: userResponse.data.userId};
            const body = {
                cartTotal:items.total,
                destination:items.destination,
                budget:items.budget,
                lodgingID:(items.lodging ? {lodgingId:items.lodging.lodgingId} : null),
                carID:(items.car ? {carId:items.car.carId} : null),
                flightID:flightID,
                eventID:eventID,
                trainID:trainID,
                userID:user
            };
            console.log(body);
            const response = await Axios.post('http://localhost:8080/api/trip/',body);
            console.log(response.data);
            navigate('/home');
        } catch (e){
            console.log('error',e);
        }
    };

    //change view
    const toggleView = (section)=>{
        if (view.hasOwnProperty(section)){
            const temp = {...view};
            //flip the view value
            temp[section] = !temp[section];
            setView(temp);
            console.log(temp);
        }
    };

    const right = "bi bi-caret-right-fill";
    const down = "bi bi-caret-down-fill";
    return (
        <>
            <Navbar/>
            <div className="container-fluid">
                <h1 className="d-flex mt-5 mb-5 justify-content-center">
                    Checkout
                </h1>
                <h3 className="row justify-content-center">
                    Trip to {items.destination}
                </h3>
                {/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<CAR*/}
                <h3 id="car" className="row">
                    <span className="col">
                        <i className=' checkout-title'/>
                        Car
                    </span>
                </h3>
                <h3 className="row">
                    <div className="col checkout-content-indent">
                        {items.car && items.car.length > 0 && (<>
                            <strong>Make & Model:</strong> {items.car.make} {items.car.model} ({items.car.year}) <br/>
                            <strong>Color:</strong> {items.car.color} <br/>
                            <strong>Pickup:</strong> {items.car.pickupLocation} on {new Date(items.car.pickupDate.seconds * 1000).toLocaleDateString()}
                            <br/>
                            <strong>Return:</strong> {items.car.returnLocation} on {new Date(items.car.returnDate.seconds * 1000).toLocaleDateString()}
                            <br/>
                        </>)}
                    </div>
                    <div className="col text-end flex-grow-0">
                        {items.car && `$${formatNumber(items.car.price)}`}
                    </div>
                </h3>
                {/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<LODGING*/}
                <h3 id="lodging" className="row">
                    <span className="col">
                        <i className=' checkout-title'/>
                        Lodging
                    </span>
                    <span className="col text-end">

                    </span>
                </h3>
                <h3 className="row">
                    <div className="col checkout-content-indent">
                        {items.lodging && (<>
                            <strong>Name:</strong> {items.lodging.name} <br/>
                            <strong>Type:</strong> {items.lodging.type} <br/>
                            <strong>Location:</strong> {items.lodging.address}, {items.lodging.cityState} <br/>
                            <strong>Details:</strong> {items.lodging.details} <br/>
                        </>)}
                    </div>
                    <div className="col text-end flex-grow-0">
                        {items.lodging && `$${formatNumber(items.lodging.price)}`}
                    </div>
                </h3>
                {/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<FLIGHTS */}
                <h3 id="flights" className="row">
                    <span className="col">
                        <a href='#flights' className='dropdown-arrow pe-2' onClick={() => {
                            toggleView('flight')
                        }}>
                            <i className={`${[right, down][+view.flight]}`}/>
                        </a>
                    Flights
                    </span>
                    <span className="col text-end flex-grow-0">
                        {/*total for all collapsed items*/}
                        {items.flights && ('$' + formatNumber(items.flights.reduce((acc, cur) => acc + cur.price, 0)))}
                    </span>
                </h3>
                <h3 className={`collapse${' d'[+view.flight]}`}>
                    {(items.flights && items.flights.length > 0) ? items.flights.map((flight, index) => (
                            <div key={index} className='row'>
                                <div className='col'>
                                    <strong>Airline:</strong> {flight.airline} <br/>
                                    <strong>Departure:</strong> {flight.departLocation} at {new Date(flight.departTime.seconds * 1000).toLocaleString()}
                                    <br/>
                                    <strong>Arrival:</strong> {flight.arriveLocation} at {new Date(flight.arriveTime.seconds * 1000).toLocaleString()}
                                    <br/>
                                    <strong>Duration:</strong> {flight.duration} <br/>
                                    <strong>Status:</strong> {flight.status} <br/>
                                    <strong>Stops:</strong> {flight.stops} <br/>
                                </div>
                                <div className='col text-end flex-grow-0'>
                                    ${formatNumber(flight.price)}
                                </div>
                                <hr/>
                            </div>
                        )) :
                        <div>
                            No Flights
                        </div>
                    }
                </h3>
                {/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<EVENTS */}
                <h3 id="events" className="row">
                    <>
                        <span className="col">
                            <a href='#events' className='dropdown-arrow pe-2' onClick={() => {
                                toggleView('event')
                            }}>
                                <i className={`${[right, down][+view.event]}`}/>
                            </a>
                            Events
                        </span>
                        <span className="col text-end">
                            {items.events && ('$' + formatNumber(items.events.reduce((acc, cur) => acc + cur.price, 0)))}
                        </span>
                    </>
                </h3>
                <h3 className={`collapse${' d'[+view.event]}`}>
                    {(items.events && items.events.length > 0) ? items.events.map((event, index) => (
                        <>
                            <div key={index} className='row'>
                                <div className='col p-2'>
                                    <strong>{event.eventName}</strong> <br/>
                                    {event.address}, {event.cityState} <br/>
                                    @ <span
                                    className='fst-italic'>{new Date(event.eventStart.seconds * 1000).toLocaleString()}</span>
                                    <span className='fst-italic'></span>
                                    {' to '}
                                    {event.eventEnd ? new Date(event.eventEnd.seconds * 1000).toLocaleString() : 'TBA'}
                                </div>
                                <div className='col text-end flex-grow-0'>
                                    ${formatNumber(event.price)}
                                </div>
                            </div>
                        </>
                    )) : (
                        <div className='row'>
                            No Events
                        </div>
                    )}
                </h3>
                {/*,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,TRAINS */}
                <h3 id="trains" className="row">
                    <span className="col">
                        <a href='#trains'
                           className='dropdown-arrow pe-2'
                           onClick={() => {toggleView('train')}}>
                            <i className={`${[right, down][+view.train]}`}/>
                        </a>
                        Trains
                    </span>
                    <span className="col text-end">
                        {items.trains && ('$' + formatNumber(items.trains.reduce((acc, cur) => acc + cur.price, 0)))}
                    </span>
                </h3>
                <h3 className={`collapse${' d'[+view.train]}`}>
                    {(items.trains && items.trains.length > 0) ? items.trains.map((train, index) => (<>
                        <div key={index} className='row'>
                            <div className='col p-2'>
                                <strong>Departure:</strong> {train.departLocation} at {new Date(train.departTime.seconds * 1000).toLocaleString()}
                                <br/>
                                <strong>Arrival:</strong> {train.arriveLocation} at {new Date(train.arriveTime.seconds * 1000).toLocaleString()}
                                <br/>
                                <strong>Duration:</strong> {train.duration} <br/>
                                <strong>Status:</strong> {train.status} <br/>
                                <strong>Stops:</strong> {train.stops} <br/>
                            </div>
                            <div className='col text-end flex-grow-0'>
                                ${formatNumber(train.price)}
                            </div>
                        </div>
                    </>)) : (
                        <div>
                            No Trains
                        </div>
                    )}
                </h3>
                {/*TOTAL and Budget row row*/}
                <hr/>
                <div className="row">
                    <span className="total col ps-5">
                        Total
                    </span>
                    <span className="total col text-end">
                        ${formatNumber(items.total)}
                    </span>
                </div>
                {
                    (items.budget >= 0) && (
                        <div className="row">
                            <span className="total col ps-5">
                                Budget
                            </span>
                            <span className="total col text-end">
                                ${formatNumber(items.budget)}
                            </span>
                        </div>
                    )
                }
                {/*Confirm Button*/}
                <div className="text-center">
                    <button type="submit" className="btn btn-md custom-button" onClick={createTrip}>
                        Confirm Trip
                    </button>
                </div>
            </div>
        </>
    );
}
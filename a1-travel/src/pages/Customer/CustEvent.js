import React, {useEffect, useState} from 'react';
import Navbar from "../../Navbars/Navbar";
import Axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import Modal from "../../components/Modal";
import DateFormat from "../../components/DateFormat";

export default function CustEvent(){
    const navigate = useNavigate();
    const {state} = useLocation();
    const [events, setEvents] = useState({
        data:[],
        select:[],
    });
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [lodgingType, setLodgingType] = useState("");
    const [budget, setBudget] = useState(null);
    const [cartTotal, setCartTotal] = useState(sessionStorage.getItem('cartTotal'));
    const [editMode, setEditMode] = useState(false);
    const [newBudget, setNewBudget] = useState('');

    // New state variables for modal
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // Query events where cityState is equal to storedDestination and the type is equal to storedType in the backend
                const response = await Axios.get(`http://localhost:8080/api/event/?cityState=${storedDestination}`);
                const data = response.data.events;
                const select = new Array(data.length).fill(false);
                const newEvents = {
                    data:data,
                    select:select
                };
                setEvents(prevState => newEvents);
                events.data.reduce((acc, events) => {
                    acc = {lodgings: []};
                    return acc;
                }, {});
            } catch (error) {
                console.error('Error fetching events:', error);
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
        fetchEvents().then();
        console.log(events.select);
    }, []);

    //close modal
    const closeModal = () => setModalVisible(false);
    //toggle select events
    const toggleSelect = (index) => {
        const updatedSelectedEvents = events.select.map((item, idx) =>
            idx === index ? !item : item
        );
        setEvents({
            ...events,
            select:updatedSelectedEvents
        });
        console.log(updatedSelectedEvents);
    };
    // New function to handle image click
    const handleImageClick = (image) => {
        setSelectedImage(image);
        setModalVisible(true);
    };

    //add up prices before navigating to checkout
    const handleEventSet = () => {
        const e = events.data.filter((event, index) => events.select[index]);
        //not empty, add to session storage
        if (e.length >= 0) {
            //sum up event prices, starting at the cart total to produce that
            const updatedCartTotal = e.reduce((acc,cur)=>acc+parseFloat(cur.price),parseFloat(cartTotal));
            //const updatedCartTotal = parseFloat(cartTotal) + eventPrice;
            setCartTotal(updatedCartTotal);
            sessionStorage.setItem('cartTotal', updatedCartTotal);
            sessionStorage.setItem('event',JSON.stringify(e));
            console.log('Event Set');
            navigate('/checkout',{state:state});
        }
        console.log('No Events to set')
    }
    //remove event if existing
    const handleEventSkip = () => {
        sessionStorage.removeItem('event');
        console.log("No Event Set");
        navigate('/checkout',{state:state});
    }

    const handleEditClick = () => {
        // Toggle the editMode value
        setEditMode((prevEditMode) => !prevEditMode);
    };

    const formatNumber = (num)=>{
        return num.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

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
                <h1>Choose your Event</h1>
            </div>
            <div className="container-fluid mt-3">
                {events.data.length > 0 ? (
                    events.data.map((event, index) => (
                        <div key={index}
                             className='card mb-4'
                             style={{ display: 'flex', flexDirection: 'row' }}>
                            <div className='col-md-3'
                                 style={{
                                     display: 'flex',
                                     background: `url(${event.image}) no-repeat center center`,
                                     backgroundSize: 'cover',
                                     alignItems: 'stretch'
                                 }}
                                 onClick={()=>handleImageClick(event.image)}>
                                {/* Background image container, now empty since the image is set as a background */}
                            </div>
                            <div className="col-md-9 d-flex flex-column justify-content-between">
                                <div className="card-body">
                                    <h5 className="card-title fw-bold">{event.eventName}</h5>
                                    <p className="card-text">{event.description}</p>
                                    <p className="fa-calendar-alt card-text">
                                        <i className='fa-calendar-alt'/> {DateFormat(event.eventStart)} - {DateFormat(event.eventEnd)}
                                    </p>
                                    <p className="card-text">
                                        <i className='fa-map-marker-alt'/> {event.address} {event.cityState}
                                    </p>
                                    <p className="card-text">
                                        <i className='fa-user'/> Organized by: {event.organizer}
                                    </p>
                                    <p className="card-text">
                                        <i className='fa-dollar-sign'/> Price: ${event.price.toFixed(2)}
                                    </p>
                                    <button className={`btn btn-${!events.select[index] ? 'outline-success' : 'outline-danger'}`}
                                            onClick={()=>toggleSelect(index)}>
                                        {!events.select[index] ? 'Select' : 'Deselect'}
                                    </button>
                                </div>
                                <div className="card-footer">
                                    <small className="text-muted">Capacity: {event.capacity} |
                                        Registered: {event.registrations}</small>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No events available</p>
                )}
            </div>
            <div className="text-center" style={{marginTop: 40}}>
                <button type="submit" className="btn btn-md custom-button"
                        onClick={handleEventSet} disabled={!events.select.some(isSelected => isSelected)}>
                    Next
                </button>
            </div>
            <div className="text-center" style={{ marginTop: 40 }}>
                <div className="container-fluid d-flex justify-content-center">
                    <button className="btn btn-link" type="button" onClick={handleEventSkip}>
                        Don't want any events? CONTINUE HERE
                    </button>
                </div>
            </div>
        </div>
        {/* Modal for displaying full image */}
        {modalVisible && (
            <Modal onClose={closeModal}>
                <img src={selectedImage} alt="Event" style={{ maxWidth: '100%', height: 'auto' }}/>
            </Modal>
        )}
</>
);
}
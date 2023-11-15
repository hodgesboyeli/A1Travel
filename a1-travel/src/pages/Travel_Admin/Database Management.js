import React, {useEffect, useRef, useState} from 'react';
import TravelAdminNavbar from "../TravelAdminNavbar";
import Axios from "axios";
import 'firebase/compat/firestore';
import { Modal } from 'bootstrap';

export default function DatabaseManagement() {
    const [showEventForm, setShowEventForm] = useState(false);
    const phoneRef = useRef(null);
    const emailRef = useRef(null);
    const imageRef = useRef(null);
    const modalRef = useRef(null);
    const errorModalRef = useRef(null);
    const [inputValues, setInputValues] = useState({
        eventName: '',
        eventType: '',
        description: '',
        organizer: '',
        phoneNumber: '',
        email: '',
        eventStart: null,
        eventEnd: null,
        location: '',
        price: null,
        capacity: null
    });

    const isFormValid = () => {
        const requiredFields = ['eventName', 'eventType', 'description', 'organizer', 'eventStart', 'eventEnd', 'location', 'price', 'capacity'];

        for (const field of requiredFields) {
            if (!inputValues[field]) {
                // Field is empty, show error and return false
                showErrorModal();
                return false;
            }
        }

        // All required fields are filled, return true
        return true;
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        console.log('handleSignUp function is working!');

        if (!isFormValid()) {
            return;
        }

        // Destructure input values
        const {
            eventName,
            eventType,
            description,
            organizer,
            eventStart,
            eventEnd,
            location,
            price,
            capacity
        } = inputValues;


        const phoneNumber = phoneRef.current.value;
        const email = emailRef.current.value;

        // Create an event object with input data
        const event = {
            eventName,
            eventType,
            description,
            organizer,
            phoneNumber,
            email,
            location,
            eventStart: eventStart + ".000Z",
            eventEnd: eventEnd + ".000Z",
            price,
            capacity
        };

        console.log(event);

        try {
            const response = await Axios.post('http://localhost:8080/api/event/', event);
            console.log(event);
            if (response.status === 201) {
                // Registration successful, you can navigate to a success page or display a success message
                console.log('Event created successfully');
                showModal();
            } else {
                // Handle registration failure, show an error message to the user
                console.error('Event create failed');
                showErrorModal();
            }
        } catch (error) {
            // Handle network errors or other issues
            console.error('Error:', error);
            showErrorModal();
        }
    };

    const showModal = () => {
        if (modalRef.current) {
            const modal = new Modal(modalRef.current);
            modal.show();
        }
    };

    const handleCloseModal = () => {
        if (modalRef.current) {
            const modal = Modal.getInstance(modalRef.current);
            if (modal) {
                modal.hide();
            }
        }
    };

    const showErrorModal = () => {
        if (errorModalRef.current) {
            const modal = new Modal(errorModalRef.current);
            modal.show();
        }
    };

    const handleCloseErrorModal = () => {
        if (errorModalRef.current) {
            const modal = Modal.getInstance(errorModalRef.current);
            if (modal) {
                modal.hide();
            }
        }
    };

    useEffect(() => {
        return () => {
            handleCloseModal();
        };
    }, []);

    useEffect(() => {
        return () => {
            handleCloseErrorModal();
        };
    }, []);

    const handleRadioChange = (event) => {
        if (event.target.id === "radioEvent") {
            setShowEventForm(true);
        } else {
            setShowEventForm(false);
        }
    };

    const handleDateChange = (date, id) => {
        const formattedDate = date ? date.toISOString().slice(0, -5) : null;
        setInputValues({
            ...inputValues,
            [id]: formattedDate ,
        });

        console.log(formattedDate + ".000Z")
    };


    const handleInputChange = (event) => {
        const { id, value, type } = event.target;

        if (type === 'datetime-local') {
            handleDateChange(new Date(value), id);
        } else {
            setInputValues({
                ...inputValues,
                [id]: value,
            });
        }
    };


    const handleReset = () => {
        setInputValues({
            eventName: '',
            eventType: '',
            description: '',
            organizer: '',
            eventStart: '',
            eventEnd: '',
            location: '',
            price: '',
            capacity: ''
        });

        // Clear Phone Number and Email input fields
        if (phoneRef.current) {
            phoneRef.current.value = '';
        }
        if (emailRef.current) {
            emailRef.current.value = '';
        }

        // Reset the file input field
        if (imageRef.current) {
            imageRef.current.value = '';
        }
    };


    return (
        <div>
            <TravelAdminNavbar />
            <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                <h1>Database Management</h1>
            </div>
            <div className="container-fluid d-flex justify-content-center">
                <p className="form-check-inline">Add New: </p>
                <input
                    className="form-check-input form-check-inline"
                    type="radio"
                    name="AddNew"
                    id="radioEvent"
                    onChange={handleRadioChange}
                />
                <label style={{ marginRight: 10 }} htmlFor="radioEvent">
                    Event
                </label>
                <input
                    className="form-check-input form-check-inline"
                    type="radio"
                    name="AddNew"
                    id="radioTransportation"
                    onChange={handleRadioChange}
                />
                <label style={{ marginRight: 10 }} htmlFor="radioTransportation">
                    Transportation
                </label>
                <input
                    className="form-check-input form-check-inline"
                    type="radio"
                    name="AddNew"
                    id="radioDestination"
                    onChange={handleRadioChange}
                />
                <label style={{ marginRight: 10 }} htmlFor="radioDestination">
                    Destination
                </label>
            </div>

            {showEventForm && (
                <div className="container-fluid d-flex justify-content-center" style={{paddingLeft: 150, paddingRight: 150}}>
                    <form className="row g-3" onSubmit={handleSignUp}>
                        <div className="col-md-6">
                            <label htmlFor="inputEventName" className="form-label">Event Name</label>
                            <input type="text" className="form-control" id="eventName" value={inputValues.eventName} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputEventType" className="form-label">Event Category</label>
                            <input type="text" className="form-control" id="eventType" value={inputValues.eventType} onChange={handleInputChange} />
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputEventDescription" className="form-label">Event Description</label>
                            <textarea className="form-control" id="description" rows="3" value={inputValues.description} onChange={handleInputChange}></textarea>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputPrice" className="form-label">Price</label>
                            <input type="number" className="form-control" id="price" value={inputValues.price} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputCapacity" className="form-label">Capacity</label>
                            <input type="number" className="form-control" id="capacity" value={inputValues.capacity} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputEventStart" className="form-label">Event Start</label>
                            <input type="datetime-local" className="form-control" id="eventStart" value={inputValues.eventStart} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputEventEnd" className="form-label">Event End</label>
                            <input type="datetime-local" className="form-control" id="eventEnd" value={inputValues.eventEnd} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputOrganizer" className="form-label">Event Organizer</label>
                            <input type="text" className="form-control" id="organizer" value={inputValues.organizer} onChange={handleInputChange}/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputLocation" className="form-label">Event Location</label>
                            <input type="text" className="form-control" id="location" value={inputValues.location} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputContactInfo" className="form-label">Contact Information</label>
                            <div className="input-group">
                                <input type="text" className= "form-control" placeholder="Phone Number" aria-label="Phone Number" ref={phoneRef} />
                                <input type="text" className= "form-control" placeholder="Email" aria-label="Email" ref={emailRef} />
                            </div>
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputEventImage" className="form-label">Event Image Upload</label>
                            <input type="file" className="form-control" id="inputEventImage" ref={imageRef} />
                        </div>
                        <div className="col-12 d-flex justify-content-center">
                            <button type="submit" className="btn btn-success">Submit</button>
                        </div>
                        <div className="col-12 d-flex justify-content-center">
                            <button type="button" className="btn btn-secondary" onClick={handleReset}>
                                Reset
                            </button>
                        </div>
                    </form>
                    <div className="modal fade" ref={modalRef} tabIndex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="successModalLabel">
                                        Success!
                                    </h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleReset}></button>
                                </div>
                                <div className="modal-body">
                                    <p>Event has been successfully created.</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleReset}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" ref={errorModalRef} tabIndex="-1" aria-labelledby="errorModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="errorModalLabel">
                                        Error!
                                    </h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseErrorModal}></button>
                                </div>
                                <div className="modal-body">
                                    <p>Error creating the event. Please try again.</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseErrorModal}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
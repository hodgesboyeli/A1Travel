import React, {useEffect, useRef, useState} from 'react';
import TravelAdminNavbar from "../../Navbars/TravelAdminNavbar";
import Axios from "axios";
import 'firebase/compat/firestore';
import { Modal } from 'bootstrap';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function DatabaseManagement() {
    const [showEventForm, setShowEventForm] = useState(false);
    const [showTransportationForm, setShowTransportationForm] = useState(false);
    const [showFlightForm, setShowFlightForm] = useState(false);
    const [showTrainForm, setShowTrainForm] = useState(false);
    const [showCarForm, setShowCarForm] = useState(false);
    const [showDestinationForm, setShowDestinationForm] = useState(false);
    const phoneRef = useRef(null);
    const emailRef = useRef(null);
    const imageRef = useRef(null);
    const modalRef = useRef(null);
    const storage = getStorage();
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
        address: '',
        cityState: '',
        price: null,
        capacity: null,
        airline: '',
        departLocation: '',
        arriveLocation: '',
        departTime: null,
        arriveTime: null,
        duration: '',
        status: '',
        stops: null,
        color: '',
        make: '',
        model: '',
        pickupDate: null,
        pickupLocation: '',
        returnDate: null,
        returnLocation: '',
        year: null,
    });

    const isEventFormValid = () => {
        const requiredFields = ['eventName', 'eventType', 'description', 'organizer', 'eventStart', 'eventEnd', 'address', 'cityState', 'price', 'capacity'];

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

    const isFlightFormValid = () => {
        const requiredFields = ['airline', 'departLocation', 'arriveLocation', 'departTime', 'arriveTime', 'price', 'duration', 'status', 'stops'];

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

    const isTrainFormValid = () => {
        const requiredFields = ['departLocation', 'arriveLocation', 'departTime', 'arriveTime', 'price', 'duration', 'status', 'stops'];

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

    const isCarFormValid = () => {
        const requiredFields = ['color', 'make', 'model', 'pickupDate', 'pickupLocation', 'price', 'returnDate', 'returnLocation', 'year'];

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

    const handleImageUpload = async (file) => {
        const storageRef = ref(storage, file.name);

        try {
            await uploadBytes(storageRef, file);
            inputValues.image = await getDownloadURL(storageRef);
        } catch (error) {
            console.error('Error uploading image: ', error);
        }
    };

    const handleEventSubmit = async (e) => {
        e.preventDefault();
        console.log('handleEventSubmit function is working!');

        if (!isEventFormValid()) {
            return;
        }

        const imageFile = imageRef.current.files[0];

        if (imageFile) {
            try {
                // Wait for image upload to complete before proceeding
                await handleImageUpload(imageFile);

                // Continue with the rest of the form submission after image upload is successful
            } catch (error) {
                console.warn('Error uploading image:', error);
                return; // Don't proceed with form submission if image upload fails
            }
        } else {
            console.warn('No image file selected');
        }
        console.log("Yoooo");

        // Destructure input values
        const {
            eventName,
            eventType,
            description,
            organizer,
            eventStart,
            eventEnd,
            address,
            cityState,
            price,
            capacity,
            image
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
            address,
            cityState,
            eventStart: eventStart + ".000Z",
            eventEnd: eventEnd + ".000Z",
            price,
            capacity,
            image
        };

        try {
            const response = await Axios.post('http://localhost:8080/api/event/', event);
            console.log(event);
            if (response.status === 201) {
                // Registration successful, you can navigate to a success page or display a success message
                console.log('Event created successfully');
                showModal();
                handleEventReset();
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

    const handleFlightSubmit = async (e) => {
        e.preventDefault();
        console.log('handleFlightSubmit function is working!');

        if (!isFlightFormValid()) {
            return;
        }

        const {
            airline,
            departLocation,
            arriveLocation,
            departTime,
            arriveTime,
            price,
            duration,
            status,
            stops
        } = inputValues;

        const flight = {
            airline,
            departLocation,
            arriveLocation,
            departTime: departTime + ".000Z",
            arriveTime: arriveTime + ".000Z",
            price,
            duration,
            status,
            stops
        };

        console.log(flight);

        try {
            const response = await Axios.post('http://localhost:8080/api/flight/', flight);
            console.log(flight);
            if (response.status === 201) {
                console.log('Flight created successfully');
                showModal();
            } else {
                console.error('Flight create failed');
                showErrorModal();
            }
        } catch (error) {
            console.error('Error:', error);
            showErrorModal();
        }
    };

    const handleTrainSubmit = async (e) => {
        e.preventDefault();
        console.log('handleTrainSubmit function is working!');

        if (!isTrainFormValid()) {
            return;
        }

        const {
            departLocation,
            arriveLocation,
            departTime,
            arriveTime,
            price,
            duration,
            status,
            stops
        } = inputValues;

        const train = {
            departLocation,
            arriveLocation,
            departTime: departTime + ".000Z",
            arriveTime: arriveTime + ".000Z",
            price,
            duration,
            status,
            stops
        };

        console.log(train);

        try {
            const response = await Axios.post('http://localhost:8080/api/train/', train);
            console.log(train);
            if (response.status === 201) {
                console.log('Train created successfully');
                showModal();
            } else {
                console.error('Train create failed');
                showErrorModal();
            }
        } catch (error) {
            console.error('Error:', error);
            showErrorModal();
        }
    };

    const handleCarSubmit = async (e) => {
        e.preventDefault();
        console.log('handleCarSubmit function is working!');

        if (!isCarFormValid()) {
            return;
        }

        const {
            color,
            make,
            model,
            pickupDate,
            pickupLocation,
            price,
            returnDate,
            returnLocation,
            year
        } = inputValues;

        const car = {
            color,
            make,
            model,
            pickupDate: pickupDate + ".000Z",
            returnDate: returnDate + ".000Z",
            pickupLocation,
            price,
            returnLocation,
            year
        };

        console.log(car);

        try {
            const response = await Axios.post('http://localhost:8080/api/car/', car);
            console.log(car);
            if (response.status === 201) {
                console.log('Car created successfully');
                showModal();
            } else {
                console.error('Car create failed');
                showErrorModal();
            }
        } catch (error) {
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

        if (event.target.id === "radioTransportation") {
            setShowTransportationForm(true);
        } else {
            setShowTransportationForm(false);
        }

        if (event.target.id === "radioFlight") {
            setShowFlightForm(true);
            setShowTransportationForm(true);
        } else {
            setShowFlightForm(false);
        }

        if (event.target.id === "radioTrain") {
            setShowTrainForm(true);
            setShowTransportationForm(true);
        } else {
            setShowTrainForm(false);
        }

        if (event.target.id === "radioCar") {
            setShowCarForm(true);
            setShowTransportationForm(true);
        } else {
            setShowCarForm(false);
        }

        if (event.target.id === "radioDestination") {
            setShowDestinationForm(true);
        } else {
            setShowDestinationForm(false);
        }
    };

    const handleDateChange = (date, id) => {

        // Convert the local date to UTC before formatting
        const formattedDate = date
            ? new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, -5)
            : null;

        setInputValues({
            ...inputValues,
            [id]: formattedDate,
        });
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


    const handleEventReset = () => {
        setInputValues({
            eventName: '',
            eventType: '',
            description: '',
            organizer: '',
            eventStart: '',
            eventEnd: '',
            address: '',
            cityState: '',
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

    const handleFlightReset = () => {
        setInputValues({
            airline: '',
            departLocation: '',
            arriveLocation: '',
            departTime: '',
            arriveTime: '',
            price: '',
            duration: '',
            status: '',
            stops: ''
        });
    };

    const handleTrainReset = () => {
        setInputValues({
            departLocation: '',
            arriveLocation: '',
            departTime: '',
            arriveTime: '',
            price: '',
            duration: '',
            status: '',
            stops: ''
        });
    };

    const handleCarReset = () => {
        setInputValues({
            color: '',
            make: '',
            model: '',
            pickupDate: '',
            pickupLocation: '',
            price: '',
            returnDate: '',
            returnLocation: '',
            year: ''
        });
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
                    <form className="row g-3" onSubmit={handleEventSubmit}>
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
                        <div className="col-md-3">
                            <label htmlFor="inputOrganizer" className="form-label">Event Organizer</label>
                            <input type="text" className="form-control" id="organizer" value={inputValues.organizer} onChange={handleInputChange}/>
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="inputAddress" className="form-label">Event Address</label>
                            <input type="text" className="form-control" id="address" value={inputValues.address} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="inputCityState" className="form-label">Event Ciy/State</label>
                            <input type="text" className="form-control" id="cityState" value={inputValues.cityState} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-5">
                            <label htmlFor="inputContactInfo" className="form-label">Contact Information</label>
                            <div className="input-group">
                                <input type="text" className= "form-control" placeholder="Phone Number" aria-label="Phone Number" ref={phoneRef} />
                                <input type="text" className= "form-control" placeholder="Email" aria-label="Email" ref={emailRef} />
                            </div>
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputEventImage" className="form-label">Event Image Upload</label>
                            <input type="file" className="form-control" id="image" ref={imageRef} />
                        </div>
                        <div className="col-12 d-flex justify-content-center">
                            <button type="submit" className="btn btn-success">Submit</button>
                        </div>
                        <div className="col-12 d-flex justify-content-center">
                            <button type="button" className="btn btn-secondary" onClick={handleEventReset}>
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
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleEventReset}></button>
                                </div>
                                <div className="modal-body">
                                    <p>Event has been successfully created.</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleEventReset}>
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

            {showTransportationForm && (
                <div className="container-fluid d-flex justify-content-center">
                    <p className="form-check-inline">Type: </p>
                    <input
                        className="form-check-input form-check-inline"
                        type="radio"
                        name="AddNew"
                        id="radioFlight"
                        onChange={handleRadioChange}
                    />
                    <label style={{ marginRight: 10 }} htmlFor="radioEvent">
                        Flight
                    </label>
                    <input
                        className="form-check-input form-check-inline"
                        type="radio"
                        name="AddNew"
                        id="radioTrain"
                        onChange={handleRadioChange}
                    />
                    <label style={{ marginRight: 10 }} htmlFor="radioTransportation">
                        Train
                    </label>
                    <input
                        className="form-check-input form-check-inline"
                        type="radio"
                        name="AddNew"
                        id="radioCar"
                        onChange={handleRadioChange}
                    />
                    <label style={{ marginRight: 10 }} htmlFor="radioDestination">
                        Car
                    </label>
                </div>
            )}

            {showFlightForm && (
                <div className="container-fluid d-flex justify-content-center" style={{paddingLeft: 150, paddingRight: 150}}>
                    <form className="row g-3" onSubmit={handleFlightSubmit}>
                        <div className="col-md-4">
                            <label htmlFor="inputAirline" className="form-label">Airline</label>
                            <input type="text" className="form-control" id="airline" value={inputValues.airline} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputDepartLocation" className="form-label">Departure Location</label>
                            <input type="text" className="form-control" id="departLocation" value={inputValues.departLocation} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputArriveLocation" className="form-label">Arrival Location</label>
                            <input type="text" className="form-control" id="arriveLocation" value={inputValues.arriveLocation} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputDepartTime" className="form-label">Departure Time</label>
                            <input type="datetime-local" className="form-control" id="departTime" value={inputValues.departTime} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputArriveTime" className="form-label">Arrival Time</label>
                            <input type="datetime-local" className="form-control" id="arriveTime" value={inputValues.arriveTime} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="inputPrice" className="form-label">Price</label>
                            <input type="number" className="form-control" id="price" value={inputValues.price} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="inputDuration" className="form-label">Duration</label>
                            <input type="text" className="form-control" id="duration" value={inputValues.duration} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="inputStatus" className="form-label">Status</label>
                            <input type="text" className="form-control" id="status" value={inputValues.status} onChange={handleInputChange}/>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="inputStops" className="form-label">Stops</label>
                            <input type="number" className="form-control" id="stops" value={inputValues.stops} onChange={handleInputChange} />
                        </div>
                        <div className="col-12 d-flex justify-content-center">
                            <button type="submit" className="btn btn-success">Submit</button>
                        </div>
                        <div className="col-12 d-flex justify-content-center">
                            <button type="button" className="btn btn-secondary" onClick={handleFlightReset}>
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
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleFlightReset}></button>
                                </div>
                                <div className="modal-body">
                                    <p>Flight has been successfully created.</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleFlightReset}>
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
                                    <p>Error creating the flight. Please try again.</p>
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

            {showTrainForm && (
                <div className="container-fluid d-flex justify-content-center" style={{paddingLeft: 150, paddingRight: 150}}>
                    <form className="row g-3" onSubmit={handleTrainSubmit}>
                        <div className="col-md-6">
                            <label htmlFor="inputDepartLocation" className="form-label">Departure Location</label>
                            <input type="text" className="form-control" id="departLocation" value={inputValues.departLocation} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputArriveLocation" className="form-label">Arrival Location</label>
                            <input type="text" className="form-control" id="arriveLocation" value={inputValues.arriveLocation} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputDepartTime" className="form-label">Departure Time</label>
                            <input type="datetime-local" className="form-control" id="departTime" value={inputValues.departTime} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputArriveTime" className="form-label">Arrival Time</label>
                            <input type="datetime-local" className="form-control" id="arriveTime" value={inputValues.arriveTime} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="inputPrice" className="form-label">Price</label>
                            <input type="number" className="form-control" id="price" value={inputValues.price} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="inputDuration" className="form-label">Duration</label>
                            <input type="text" className="form-control" id="duration" value={inputValues.duration} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="inputStatus" className="form-label">Status</label>
                            <input type="text" className="form-control" id="status" value={inputValues.status} onChange={handleInputChange}/>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="inputStops" className="form-label">Stops</label>
                            <input type="number" className="form-control" id="stops" value={inputValues.stops} onChange={handleInputChange} />
                        </div>
                        <div className="col-12 d-flex justify-content-center">
                            <button type="submit" className="btn btn-success">Submit</button>
                        </div>
                        <div className="col-12 d-flex justify-content-center">
                            <button type="button" className="btn btn-secondary" onClick={handleTrainReset}>
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
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleTrainReset}></button>
                                </div>
                                <div className="modal-body">
                                    <p>Train has been successfully created.</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleTrainReset}>
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
                                    <p>Error creating the train. Please try again.</p>
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

            {showCarForm && (
                <div className="container-fluid d-flex justify-content-center" style={{paddingLeft: 150, paddingRight: 150}}>
                    <form className="row g-3" onSubmit={handleCarSubmit}>
                        <div className="col-md-3">
                            <label htmlFor="inputMake" className="form-label">Make</label>
                            <input type="text" className="form-control" id="make" value={inputValues.make} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="inputModel" className="form-label">Model</label>
                            <input type="text" className="form-control" id="model" value={inputValues.model} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="inputYear" className="form-label">Year</label>
                            <input type="number" className="form-control" id="year" value={inputValues.year} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="inputColor" className="form-label">Color</label>
                            <input type="text" className="form-control" id="color" value={inputValues.color} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputPickupDate" className="form-label">Pickup Date</label>
                            <input type="datetime-local" className="form-control" id="pickupDate" value={inputValues.pickupDate} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputPickupLocation" className="form-label">Pickup Location</label>
                            <input type="text" className="form-control" id="pickupLocation" value={inputValues.pickupLocation} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputReturnDate" className="form-label">Return Date</label>
                            <input type="datetime-local" className="form-control" id="returnDate" value={inputValues.returnDate} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputReturnLocation" className="form-label">Return Location</label>
                            <input type="text" className="form-control" id="returnLocation" value={inputValues.returnLocation} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="inputPrice" className="form-label">Price</label>
                            <input type="number" className="form-control" id="price" value={inputValues.price} onChange={handleInputChange} />
                        </div>
                        <div className="col-12 d-flex justify-content-center">
                            <button type="submit" className="btn btn-success">Submit</button>
                        </div>
                        <div className="col-12 d-flex justify-content-center">
                            <button type="button" className="btn btn-secondary" onClick={handleCarReset}>
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
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCarReset}></button>
                                </div>
                                <div className="modal-body">
                                    <p>Car has been successfully created.</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCarReset}>
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
                                    <p>Error creating the car. Please try again.</p>
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
import React, {useRef, useState} from 'react';
import AdminNavbar from "../AdminNavbar";
import TravelAdminNavbar from "../TravelAdminNavbar";

export default function DatabaseManagement() {
    const [showEventForm, setShowEventForm] = useState(false);
    const phoneRef = useRef(null);
    const emailRef = useRef(null);
    const imageRef = useRef(null);
    const [inputValues, setInputValues] = useState({
        inputEventName: '',
        inputEventCategory: '',
        inputEventDescription: '',
        inputEventOrganizer: '',
        inputPhoneNumber: '',
        inputEmail: '',
    });

    const handleRadioChange = (event) => {
        if (event.target.id === "radioEvent") {
            setShowEventForm(true);
        } else {
            setShowEventForm(false);
        }
    };

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setInputValues({
            ...inputValues,
            [id]: value,
        });
    };

    const handleReset = () => {
        setInputValues({
            inputEventName: '',
            inputEventCategory: '',
            inputEventDescription: '',
            inputEventOrganizer: '',
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
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label htmlFor="inputEventName" className="form-label">Event Name</label>
                            <input type="text" className="form-control" id="inputEventName" value={inputValues.inputEventName} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputEventCategory" className="form-label">Event Category</label>
                            <input type="text" className="form-control" id="inputEventCategory" value={inputValues.inputEventCategory} onChange={handleInputChange} />
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputEventDescription" className="form-label">Event Description</label>
                            <textarea className="form-control" id="inputEventDescription" rows="3" value={inputValues.inputEventDescription} onChange={handleInputChange}></textarea>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputEventOrganizer" className="form-label">Event Organizer</label>
                            <input type="text" className="form-control" id="inputEventOrganizer" value={inputValues.inputEventOrganizer} onChange={handleInputChange}/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputContactInfo" className="form-label">Contact Information</label>
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Phone Number" aria-label="Phone Number" ref={phoneRef} />
                                <input type="text" className="form-control" placeholder="Email" aria-label="Email" ref={emailRef} />
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
                </div>
            )}
        </div>
    );
}

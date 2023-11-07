import React, { useState } from 'react';
import AdminNavbar from "../AdminNavbar";
import TravelAdminNavbar from "../TravelAdminNavbar";

export default function DatabaseManagement() {
    const [showEventForm, setShowEventForm] = useState(false);

    const handleRadioChange = (event) => {
        if (event.target.id === "radioEvent") {
            setShowEventForm(true);
        } else {
            setShowEventForm(false);
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
                            <input type="text" className="form-control" id="inputEventName" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputEventCategory" className="form-label">Event Category</label>
                            <input type="text" className="form-control" id="inputEventCategory" />
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputEventDescription" className="form-label">Event Description</label>
                            <textarea className="form-control" id="inputEventDescription" rows="3"></textarea>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputEventOrganizer" className="form-label">Event Organizer</label>
                            <input type="text" className="form-control" id="inputEventOrganizer" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputContactInfo" className="form-label">Contact Information</label>
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Phone Number" aria-label="Phone Number" />
                                <input type="text" className="form-control" placeholder="Email" aria-label="Email" />
                            </div>
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputEventImage" className="form-label">Event Image Upload</label>
                            <input type="file" className="form-control" id="inputEventImage" />
                        </div>
                        <div className="col-12 d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

import React, {useRef, useState} from 'react';
import AdminNavbar from "../../Navbars/TravelAdminNavbar";
import Axios from "axios";

export default function CreateAnnouncements() {
    // const [showEventForm, setShowEventForm] = useState(false);
    // const phoneRef = useRef(null);
    // const emailRef = useRef(null);
    // const imageRef = useRef(null);
    // const [inputValues, setInputValues] = useState({
    //     body: '',
    //     header: '',
    //     type: '',
    // });
    //
    // const handleSignUp = async (e) => {
    //     e.preventDefault();
    //     console.log('handleSignUp function is working!');
    //
    //     // Destructure input values
    //     const {
    //         body,
    //         header,
    //         type,
    //     } = inputValues;
    //
    //     const phoneNumber = phoneRef.current.value;
    //     const email = emailRef.current.value;
    //
    //     // Create an event object with input data
    //     const event = {
    //         eventName,
    //         eventType,
    //         description,
    //         organizer,
    //         phoneNumber,
    //         email,
    //     };
    //
    //     try {
    //         const response = await Axios.post('http://localhost:8080/api/event/', event);
    //         console.log(event);
    //         if (response.status === 201) {
    //             // Registration successful, you can navigate to a success page or display a success message
    //             console.log('Event created successfully');
    //         } else {
    //             // Handle registration failure, show an error message to the user
    //             console.error('Event create failed');
    //         }
    //     } catch (error) {
    //         // Handle network errors or other issues
    //         console.error('Error:', error);
    //     }
    // };
    //
    // const handleRadioChange = (event) => {
    //     if (event.target.id === "radioEvent") {
    //         setShowEventForm(true);
    //     } else {
    //         setShowEventForm(false);
    //     }
    // };
    //
    // const handleInputChange = (event) => {
    //     const { id, value } = event.target;
    //     setInputValues({
    //         ...inputValues,
    //         [id]: value,
    //     });
    // };
    //
    // const handleReset = () => {
    //     setInputValues({
    //         eventName: '',
    //         eventType: '',
    //         description: '',
    //         organizer: '',
    //     });
    //
    //     // Clear Phone Number and Email input fields
    //     if (phoneRef.current) {
    //         phoneRef.current.value = '';
    //     }
    //     if (emailRef.current) {
    //         emailRef.current.value = '';
    //     }
    //
    //     // Reset the file input field
    //     if (imageRef.current) {
    //         imageRef.current.value = '';
    //     }
    // };


    return (
        <div>
            <AdminNavbar />
            <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                <h1>Create Announcement</h1>
            </div>
                <div className="container-fluid d-flex justify-content-center" style={{paddingLeft: 150, paddingRight: 150}}>
                    <form>
                        <div className="row mb-3">
                            <label htmlFor="inputAnnouncementName" className="form-label">Announcement Header</label>
                            <input type="text" className="form-control" id="announcementName"/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="organizer" className="form-label">Announcement Type</label>
                            <input type="text" className="form-control" id="organizer" />
                        </div>
                        <div className="mb-3 col-12">
                            <label htmlFor="body" className="form-label">Announcement Body</label>
                            <textarea className="form-control" id="body" rows="3"></textarea>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputContactInfo" className="form-label">Contact Information</label>
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Phone Number" aria-label="Phone Number" />
                                <input type="text" className="form-control" placeholder="Email" aria-label="Email" />
                            </div>
                        </div>
                        <div className="col-12 d-flex justify-content-center">
                            <button type="submit" className="btn btn-success">Submit</button>
                        </div>
                        <div className="col-12 d-flex justify-content-center">
                            <button type="button" className="btn btn-secondary" >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
        </div>
    );
}
import React, {useRef, useState} from 'react';
import AdminNavbar from "../../Navbars/TravelAdminNavbar";
import Axios from "axios";

export default function CreateAnnouncements() {
    const [inputValues, setInputValues] = useState({
        body: '',
        header: '',
        type: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('handleSubmit function is working!');

        // Destructure input values
        const {
            body,
            header,
            type,
        } = inputValues;

        // Create an announcement object with input data
        const announcement = {
            body,
            header,
            type,
        };

        try {
            const response = await Axios.post('http://localhost:8080/api/announcement/', announcement);
            console.log(announcement);
            if (response.status === 201) {
                console.log('Announcement created successfully');
            } else {
                console.error('Announcement create failed');
            }
        } catch (error) {
            // Handle network errors or other issues
            console.error('Error:', error);
        }
    };

    const handleInputChange = (announcement) => {
        const { id, value } = announcement.target;
        setInputValues({
            ...inputValues,
            [id]: value,
        });
    };

    const handleReset = () => {
        setInputValues({
            body: '',
            header: '',
        });
    };


    return (
        <div>
            <AdminNavbar />
            <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                <h1>Create Announcement</h1>
            </div>
                <div className="container-fluid d-flex justify-content-center" style={{paddingLeft: 150, paddingRight: 150}}>
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3 col-20">
                            <label htmlFor="inputAnnouncementName" className="form-label">Announcement Header</label>
                            <input type="text" className="form-control" id="announcementName" value={inputValues.header} onChange={handleInputChange}/>
                        </div>
                        <div className="col-md-6 col-20">
                            <label htmlFor="organizer" className="form-label">Announcement Type</label>
                            <input type="text" className="form-control" id="organizer" />
                        </div>
                        <div className="mb-3 col-20">
                            <label htmlFor="body" className="form-label">Announcement Body</label>
                            <textarea className="form-control" id="body" rows="3" value={inputValues.body} onChange={handleInputChange}></textarea>
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
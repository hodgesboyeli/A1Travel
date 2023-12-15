import React, { useEffect, useRef, useState } from 'react';
import AdminNavbar from "../../Navbars/TravelAdminNavbar";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from "bootstrap";
import { auth } from "../../Firebase";
import "../../Firebase.js";

export default function CreateAnnouncements() {
    const [inputValues, setInputValues] = useState({
        body: '',
        header: '',
        type: '',
        code: '',
        name: '',
        discount: null
    });

    const modalRef = useRef(null);
    const [showSystemForm, setShowSystemForm] = useState(false);
    const [showBugForm, setShowBugForm] = useState(false);
    const [showSpecialForm, setShowSpecialForm] = useState(false);

    const handleDropdownChange = (type) => {
        setShowSystemForm(type.target.value === "System");
        setShowBugForm(type.target.value === "Bug");
        setShowSpecialForm(type.target.value === "Special");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('handleSubmit function is working!');

        // Destructure input values
        const { body, header, type, code, name, discount } = inputValues;

        // Create an announcement object with input data
        const announcement = {
            body,
            header,
            type
        };

        const special = {
            code,
            discount,
            name
        };

        if (showSystemForm || showBugForm) {
            try {
                const adminResponse = await Axios.get('http://localhost:8080/api/user/email/' + sessionStorage.getItem('email'));
                const updatedAnnouncement = {
                    'body': announcement.body,
                    'header': announcement.header,
                    'type': announcement.type,
                    'adminID': adminResponse.data.userId
                };

                const response = await Axios.post('http://localhost:8080/api/announcement/', updatedAnnouncement);
                console.log(updatedAnnouncement);
                if (response.status === 201) {
                    console.log('Announcement created successfully');
                    showModal();
                    handleReset();
                } else {
                    console.error('Announcement create failed');
                }
            } catch (error) {
                // Handle network errors or other issues
                console.error('Error:', error);
            }
        }

        if (showSpecialForm) {
            try {
                const adminResponse = await Axios.get('http://localhost:8080/api/user/email/' + sessionStorage.getItem('email'));
                const updatedAnnouncement = {
                    'body': announcement.body,
                    'header': announcement.header,
                    'type': announcement.type,
                    'adminID': adminResponse.data.userId
                };

                const updatedSpecial = {
                    'code': special.code,
                    'discount': special.discount,
                    'name': special.name
                };

                const response = await Axios.post('http://localhost:8080/api/announcement/', updatedAnnouncement);
                console.log(updatedAnnouncement);
                if (response.status === 201) {
                    console.log('Announcement created successfully');
                    showModal();
                    handleReset();
                } else {
                    console.error('Announcement create failed');
                }

                const specialResponse = await Axios.post('http://localhost:8080/api/special/', updatedSpecial);
                console.log(updatedSpecial);
                if (specialResponse.status === 201) {
                    console.log('Special created successfully');
                    showModal();
                    handleReset();
                } else {
                    console.error('Special create failed');
                }
            } catch (error) {
                // Handle network errors or other issues
                console.error('Error:', error);
            }
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
            type: '',
            code: '',
            discount: ''
        });
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

    useEffect(() => {
        return () => {
            handleCloseModal();
        };
    }, []);

    return (
        <div>
            <AdminNavbar />
            <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                <h1>Create Announcement</h1>
            </div>

            <div className="container-fluid d-flex justify-content-center" style={{ paddingLeft: 150, paddingRight: 150 }}>
                <form className="row col-md-6" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="type" className="form-label">Announcement Type</label>
                        <select className="form-select" id="type" value={inputValues.type} onChange={(e) => { handleDropdownChange(e); handleInputChange(e); }}>
                            <option defaultValue>Select Announcement Type</option>
                            <option value="System">System</option>
                            <option value="Bug">Bug</option>
                            <option value="Special">Special</option>
                        </select>
                    </div>

                    {showSystemForm && (
                        <div>
                            <div className="mb-3">
                                <label htmlFor="inputSystemName" className="form-label">System Form Header</label>
                                <input type="text" className="form-control" id="header" value={inputValues.header} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="body" className="form-label">System Form Body</label>
                                <textarea className="form-control" id="body" rows="3" value={inputValues.body} onChange={handleInputChange}></textarea>
                            </div>
                        </div>
                    )}

                    {showBugForm && (
                        <div>
                            <div className="mb-3">
                                <label htmlFor="inputBugName" className="form-label">Bug Form Header</label>
                                <input type="text" className="form-control" id="header" value={inputValues.header} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="body" className="form-label">Bug Form Body</label>
                                <textarea className="form-control" id="body" rows="3" value={inputValues.body} onChange={handleInputChange}></textarea>
                            </div>
                        </div>
                    )}

                    {showSpecialForm && (
                        <div>
                            <div className="mb-3">
                                <label htmlFor="inputBugName" className="form-label">Special Form Header</label>
                                <input type="text" className="form-control" id="header" value={inputValues.header} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="body" className="form-label">Special Form Body</label>
                                <textarea className="form-control" id="body" rows="3" value={inputValues.body} onChange={handleInputChange}></textarea>
                            </div>
                            <br/><br/>
                            <div className="mb-3">
                                <label htmlFor="inputSpecialName" className="form-label">Special Name</label>
                                <input type="text" className="form-control" id="name" value={inputValues.name} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputSpecialCode" className="form-label">Special Code</label>
                                <input type="text" className="form-control" id="code" value={inputValues.code} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputDiscount" className="form-label">Discount (%)</label>
                                <input type="number" className="form-control" id="discount" min="1" max="100" step="1" value={inputValues.discount} onChange={handleInputChange} />
                            </div>
                        </div>

                    )}

                    {(showSystemForm || showBugForm || showSpecialForm) && (
                        <div>
                            <div className="mb-3 col-12 d-flex justify-content-center">
                                <button type="submit" className="btn btn-success">Post Announcement</button>
                            </div>
                            <div className="mb-3 col-12 d-flex justify-content-center">
                                <button type="button" className="btn btn-secondary" onClick={handleReset}>
                                    Reset
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>

            <div className="modal fade" ref={modalRef} tabIndex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="successModalLabel">
                                Success!
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">Announcement created successfully!!</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
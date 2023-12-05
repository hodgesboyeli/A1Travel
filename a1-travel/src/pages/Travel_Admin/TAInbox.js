import React, {useRef, useState} from 'react';
import 'firebase/firestore';
import {Modal, Toast} from "bootstrap";
import Axios from "axios";
import TravelAdminNavbar from "../../Navbars/TravelAdminNavbar";

export default function TAInbox() {
    const modalRef = useRef(null);
    const toastRef = useRef(null);
    const [messageData, setMessageData] = useState({
        receiver: '',
        message: '',
    });

    const isMessageFormValid = () => {
        return Object.values(messageData).every(value => value.trim() !== '');
    };

    const handleCreateMessage = async (e) => {
        e.preventDefault();
        console.log(messageData);

        if (!isMessageFormValid()) {
            console.log('Please fill all fields');
            return;
        }

        try {
            const sender = sessionStorage.getItem('email');
            const senderResponse = await Axios.get('http://localhost:8080/api/user/email/'+sender);
            const receiverResponse = await Axios.get('http://localhost:8080/api/user/email/'+messageData.receiver);
            const updatedMessageData = {
                'senderID': senderResponse.data.userId,
                'receiverID': receiverResponse.data.userId,
                'messageContent': messageData.message
            };
            const messageResponse = await Axios.post('http://localhost:8080/api/message/',updatedMessageData);
            console.log('Message to be sent:', updatedMessageData.message);
            if (messageResponse.status === 201) {
                // Registration successful, you can navigate to a success page or display a success message
                console.log('Message created successfully');
                handleCloseModal();
                showSuccessToast();
            } else {
                // Handle registration failure, show an error message to the user
                console.error('Message create failed');
            }
        } catch (error) {
            // Handle network errors or other issues
            console.error('Error:', error.message);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setMessageData(prevData=> ({
            ...prevData,
            [id]: value,
        }));
        console.log(messageData);
    };

    // Function to open the modal
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

    const showSuccessToast = () => {
        if (toastRef.current) {
            const toast = new Toast(toastRef.current);
            toast.show();
        }
    };

    return (
        <div>
            <TravelAdminNavbar />
            <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                <h1>Messages</h1>
            </div>
            <div className="col-12 d-flex justify-content-center">
                <button type="button" className="btn btn-primary" onClick={showModal}>
                    Create New Message
                </button>
                <div className="modal fade" ref={modalRef} id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    New message
                                </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="receiver" className="col-form-label">
                                            Recipient Email:
                                        </label>
                                        <input type="text" className="form-control" id="receiver" onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message" className="col-form-label">
                                            Message:
                                        </label>
                                        <textarea className="form-control" id="message" onChange={handleInputChange}></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                    Close
                                </button>
                                <button type="button" className="btn btn-success" onClick={handleCreateMessage}>
                                    Send message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="toast-container position-fixed top-0 end-0 p-3">
                    <div ref={toastRef} className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="toast-header">
                            <strong className="me-auto">Success!</strong>
                            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                        <div className="toast-body">Message sent successfully!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
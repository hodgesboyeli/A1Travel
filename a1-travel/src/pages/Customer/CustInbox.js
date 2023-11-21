import React, {useRef, useState} from 'react';
import Navbar from '../Navbar';
import 'firebase/firestore';
import {Modal, Toast} from "bootstrap";
import Axios from "axios";
import {db} from "../../Firebase";

export default function CustInbox() {
    const modalRef = useRef(null);
    const toastRef = useRef(null);
    const [inputValues, setInputValues] = useState({
        receiverEmail: '',
        messageContent: '',
    });

    const isMessageFormValid = () => {
        const requiredFields = ['receiver-email', 'message-content'];  // Update field names

        for (const field of requiredFields) {
            if (!inputValues[field]) {
                // Field is empty, show error and return false
                console.error(`Error creating message: ${field} is empty`);
                return false;
            }
        }

        // All required fields are filled, return true
        return true;
    };

    const handleCreateMessage = async (e) => {

        e.preventDefault();
        console.log('handleCreateMessage function is working!');

        if (!isMessageFormValid()) {
            return;
        }

        const {
            'receiver-email': receiverEmail,  // Update field names
            'message-content': messageContent,  // Update field names
        } = inputValues;

        // Create a message object with input data
        const message = {
            receiverEmail,
            messageContent,
        };

        try {
            const userResponse = await Axios.get('http://localhost:8080/api/user/email/'+sessionStorage.getItem('email'));
            const userId = userResponse.data.userId;
            console.log(userId);
            const response = await Axios.post('http://localhost:8080/api/message/' + receiverEmail, {
                'senderID':userId,
                'messageContent':message.messageContent
            });
            console.log('Message to be sent:', message);
            if (response.status === 201) {
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
        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [id]: value,
        }));
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
            <Navbar />
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
                                <button button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="receiver-email" className="col-form-label">
                                            Recipient Email:
                                        </label>
                                        <input type="text" className="form-control" id="receiver-email" onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message-content" className="col-form-label">
                                            Message:
                                        </label>
                                        <textarea className="form-control" id="message-content" onChange={handleInputChange}></textarea>
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
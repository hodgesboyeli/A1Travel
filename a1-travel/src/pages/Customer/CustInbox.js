import React, {useEffect, useRef, useState} from 'react';
import Navbar from '../Navbar';
import 'firebase/firestore';
import {Modal, Toast} from "bootstrap";
import Axios from "axios";

export default function CustInbox() {
    const modalRef = useRef(null);
    const toastRef = useRef(null);
    const [messageData, setMessageData] = useState({
        receiver: '',
        message: '',
    });
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [sentMessages, setSentMessages] = useState([]);
    const [activeTab, setActiveTab] = useState('received');


    useEffect(() => {
        // Fetch initial data when the component mounts
        handleTabClick(activeTab);
    }, [activeTab]); // Trigger the effect whenever activeTab changes

    // Add this state above your return statement

// Modify the handleTabClick function to set the active tab
    const handleTabClick = async (tab) => {
        setActiveTab(tab);
        try {
            const userId = sessionStorage.getItem('userId');
            console.log('User ID:', userId);

            let endpoint;
            if (tab === 'received') {
                endpoint = `http://localhost:8080/api/message/${userId}`;
            } else if (tab === 'sent') {
                endpoint = `http://localhost:8080/api/message/sent/${userId}`;
            }

            const response = await Axios.get(endpoint);

            if (tab === 'received') {
                console.log('Received Messages:', response.data); // Log received messages
                setReceivedMessages(response.data);
                setSentMessages([]); // Clear sent messages state
            } else if (tab === 'sent') {
                console.log('Sent Messages:', response.data); // Log sent messages
                setSentMessages(response.data);
                setReceivedMessages([]); // Clear received messages state
            }
        } catch (error) {
            console.error('Error fetching messages:', error.message);
        }
    };







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

            <div className="row justify-content-center">
                <div className="col-12 d-flex justify-content-center">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeTab === 'received' ? 'active' : ''}`}
                                onClick={() => handleTabClick('received')}
                            >
                                Received Messages
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeTab === 'sent' ? 'active' : ''}`}
                                onClick={() => handleTabClick('sent')}
                            >
                                Sent Messages
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="tab-content" id="pills-tabContent">
                <div
                    className={`tab-pane fade show ${activeTab === 'received' ? 'active' : ''}`}
                    id="pills-home"
                    role="tabpanel"
                >
                    {activeTab === 'received' && Array.isArray(receivedMessages) && receivedMessages.map((message) => (
                        <div key={message.id}>
                            {/* Render the content of each received message */}
                            <p>{message.messageContent}</p>
                        </div>
                    ))}
                    {activeTab === 'received' && (!Array.isArray(receivedMessages) || receivedMessages.length === 0) && <p>No received messages</p>}
                </div>
                <div
                    className={`tab-pane fade ${activeTab === 'sent' ? 'show active' : ''}`}
                    id="pills-profile"
                    role="tabpanel"
                >
                    {activeTab === 'sent' && Array.isArray(sentMessages) && sentMessages.map((message) => (
                        <div key={message.id}>
                            {/* Render the content of each sent message */}
                            <p>{message.messageContent}</p>
                        </div>
                    ))}
                    {activeTab === 'sent' && (!Array.isArray(sentMessages) || sentMessages.length === 0) && <p>No sent messages</p>}</div>
            </div>
        </div>
    );
}
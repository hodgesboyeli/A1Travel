import React, {useEffect, useRef, useState} from 'react';
import Navbar from '../Navbar';
import 'firebase/firestore';
import {Modal, Toast} from "bootstrap";
import Axios from "axios";

export default function CustInbox() {
    const modalRef = useRef(null);
    const toastRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [messageData, setMessageData] = useState({
        receiver: '',
        message: '',
    });
    const [messages, setMessages] = useState({
        received: [],
        sent: [],
        fetched: {
            received: false,
            sent: false,
        }
    });
    const [activeView, setActiveView] = useState('received');

    useEffect(() => {
        if (!messages.fetched[activeView]) {
            fetchMessages(activeView).then();
        }
    }, [activeView]);

    const fetchMessages = async (view) => {
        setIsLoading(true);
        const email = sessionStorage.getItem('email');
        const endpoint = `http://localhost:8080/api/message/?${view === 'received' ? 'receiver' : 'sender'}=${email}`;
        try {

            const response = await Axios.get(endpoint);
            setMessages(prevState => ({
                ...prevState,
                [view]: response.data.messages,
                fetched: { ...prevState.fetched, [view]: true }
            }));
        } catch (error) {
            console.error('Error fetching messages:', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleTabClick = (view) => {
        setActiveView(view);
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
            const updatedMessageData = {
                'senderID': sessionStorage.getItem('email'),
                'receiverID': messageData.receiver,
                'messageContent': messageData.message
            };
            const messageResponse = await Axios.post('http://localhost:8080/api/message/',updatedMessageData);
            console.log('Message to be sent:', updatedMessageData.message);
            if (messageResponse.status === 201) {
                // Registration successful, you can navigate to a success page or display a success message
                console.log('Message created successfully');
                handleCloseModal();
                showSuccessToast();
                setMessageData({
                    receiver:'',
                    message: ''
                });
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

    function formatTimestamp(timestamp) {
        const messageDate = new Date(timestamp.seconds * 1000);
        const now = new Date();

        // Check if the date is today
        if (messageDate.toDateString() === now.toDateString()) {
            return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }

        // Check if the date is within this week
        if (isSameWeek(messageDate, now)) {
            return messageDate.toLocaleDateString([], { weekday: 'long' });
        }

        // Default format for dates older than a week
        return messageDate.toLocaleDateString([], { weekday: 'short', month: '2-digit', day: '2-digit' });
    }

    function isSameWeek(date1, date2) {
        const startOfWeek = (date) => {
            const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1); // adjust when week starts
            return new Date(date.setDate(diff));
        }

        const startOfDate1 = startOfWeek(new Date(date1));
        const startOfDate2 = startOfWeek(new Date(date2));

        return startOfDate1.toDateString() === startOfDate2.toDateString();
    }

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
                                        <input type="email" className="form-control" id="receiver" value={messageData.receiver} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message" className="col-form-label">
                                            Message:
                                        </label>
                                        <textarea className="form-control" id="message" value={messageData.message} onChange={handleInputChange}></textarea>
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
                                className={`nav-link ${activeView === 'received' ? 'active' : ''}`}
                                onClick={() => handleTabClick('received')}
                            >
                                Received Messages
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeView === 'sent' ? 'active' : ''}`}
                                onClick={() => handleTabClick('sent')}
                            >
                                Sent Messages
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="tab-content" id="pills-tabContent">
                {isLoading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: "100px" }}>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (<>
                        <div className={`tab-pane fade show ${activeView === 'received' ? 'active' : ''}`} role="tabpanel">
                            {activeView === 'received' && (messages.received.length > 0 ? (
                                    messages.received.map((message, index) => (
                                        <div key={index} className="pt-2 pb-2 ps-1 pe-1 text-bg-secondary d-flex justify-content-between">
                                            {/* Render the content of each sent message */}
                                            <span className="ps-4 pe-5 fw-bold">
                                        {message.senderID}
                                    </span>
                                            <span className="text-truncate flex-fill pe-2">
                                        {message.messageContent}
                                    </span>
                                            <span className="ps-4 pe-3 text-nowrap fw-bold">
                                        <b>{formatTimestamp(message.timestamp)}</b>
                                    </span>
                                        </div>
                                    ))) : <p className="text-center">No received messages</p>
                            )}
                        </div>
                        <div className={`tab-pane fade show ${activeView === 'sent' ? 'active' : ''}`} role="tabpanel">
                            {activeView === 'sent' && (messages.sent.length > 0 ? (
                                    messages.sent.map((message, index) => (
                                        <div key={index} className="pt-2 pb-2 ps-1 pe-1 text-bg-secondary d-flex justify-content-between">
                                            {/* Render the content of each sent message */}
                                            <span className="ps-4 pe-5 fw-bold">
                                        {message.senderID}
                                    </span>
                                            <span className="text-truncate flex-fill pe-2">
                                        {message.messageContent}
                                    </span>
                                            <span className="ps-4 pe-3 text-nowrap fw-bold">
                                        <b>{formatTimestamp(message.timestamp)}</b>
                                    </span>
                                        </div>
                                    ))) : <p className="text-center">No sent messages</p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
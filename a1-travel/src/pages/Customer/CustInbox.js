import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import axios from 'axios';
import { auth } from '../../Firebase';
import 'firebase/firestore';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';  // Adjust the import path

export default function CustInbox() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const currentUser = auth.currentUser;

        const fetchData = async () => {
            try {
                if (currentUser) {
                    const receiverId = currentUser.uid;
                    const endpoint = `http://localhost:8080/api/message/${receiverId}`;

                    // Make the API call
                    const response = await axios.get(endpoint);

                    // Assuming your API response has an array of messages
                    const receivedMessages = response.data.messages;
                    setMessages(receivedMessages);
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
                // Handle error, show a message to the user, etc.
            }
        };

        fetchData();
    }, [auth]); // Include auth in the dependency array if auth is asynchronous

    return (
        <div>
            <Navbar />
            <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                <h1>Messages</h1>
            </div>
            <div className="message-list">
                {messages.map(message => (
                    <div>
                        <p>{message.messageContent}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

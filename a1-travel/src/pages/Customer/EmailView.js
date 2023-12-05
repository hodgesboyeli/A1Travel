import React from 'react';
import { useHistory } from 'react-router-dom';

const EmailView = ({ message }) => {
    const history = useHistory();

    // This function will be called when the back button is clicked
    const goBack = () => {
        history.goBack();
    };

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col">
                    <button className="btn btn-link" onClick={goBack}>
                        ← Back
                    </button>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex align-items-center">
                            {/* Placeholder for profile picture - left empty as per instructions */}
                            <div className="border border-secondary rounded-circle" style={{ width: '50px', height: '50px', marginRight: '10px' }}></div>
                            <div>
                                <div className="fw-bold">{message.senderName} &lt;{message.senderEmail}&gt;</div>
                                <div className="text-muted">To: {message.receiverEmail}</div>
                            </div>
                        </div>
                        <div className="text-muted">
                            {new Date(message.timestamp).toLocaleDateString()} {new Date(message.timestamp).toLocaleTimeString()}
                        </div>
                    </div>
                    <p className="border rounded p-3 bg-light">
                        {message.content}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EmailView;

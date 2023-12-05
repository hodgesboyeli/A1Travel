import React, { useState } from 'react';

export default function UserView({ user }) {
    const [showTrips, setShowTrips] = useState(false);

    return (
        <div className="card mb-3 w-auto">
            <div className="card-body" onClick={() => setShowTrips(!showTrips)}>
                <h5 className="card-title">{user.firstName} {user.lastName}</h5>
                <p className="card-text">{user.email}</p>
            </div>
            {showTrips && (
                <div className="card-body bg-light">
                    <h6 className="card-title">Trips:</h6>
                    <ul className="list-group list-group-flush">
                        {user.trips.map((trip, index) => (
                            <li key={index} className="list-group-item">
                                Destination: {trip.destination}, Budget: {trip.budget}, Total Spent: {trip.total}
                                {/* Add more details about flight and car here if needed */}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

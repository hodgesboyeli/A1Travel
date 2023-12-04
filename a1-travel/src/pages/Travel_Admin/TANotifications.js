import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import Axios from 'axios';
import AdminNavbar from "../AdminNavbar";
import TravelAdminNavbar from "../TravelAdminNavbar";

export default function TANotifications() {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(true); // Change the initial state to true

    const sortAnnouncements = (announcements) => {
        return announcements.sort((a, b) => {
            const diff = b.timestamp.seconds - a.timestamp.seconds;
            if (diff !== 0) return diff;
            return b.timestamp.nanoseconds - a.timestamp.nanoseconds;
        });
    };

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await Axios.get('http://localhost:8080/api/announcement/');
                console.log('API Response:', response);

                const announcementsData = response.data && response.data.announcements;
                const fetchedAnnouncements = announcementsData || [];
                setAnnouncements(sortAnnouncements(fetchedAnnouncements));
            } catch (error) {
                console.error('Error fetching announcements:', error);
            } finally {
                setLoading(false);
                setIsLoading(false); // Set isLoading to false when the data is loaded
            }
        };

        fetchAnnouncements();
    }, []);

    console.log('Announcements:', announcements);

    function formatTimestamp(timestamp) {
        const messageDate = new Date(timestamp.seconds * 1000);
        const now = new Date();

        if (messageDate.toDateString() === now.toDateString()) {
            return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }

        if (isSameWeek(messageDate, now)) {
            return messageDate.toLocaleDateString([], { weekday: 'long' });
        }

        return messageDate.toLocaleDateString([], { weekday: 'short', month: '2-digit', day: '2-digit' });
    }

    function isSameWeek(date1, date2) {
        const startOfWeek = (date) => {
            const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
            return new Date(date.setDate(diff));
        };

        const startOfDate1 = startOfWeek(new Date(date1));
        const startOfDate2 = startOfWeek(new Date(date2));

        return startOfDate1.toDateString() === startOfDate2.toDateString();
    }

    return (
        <div>
            <TravelAdminNavbar />
            <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                <h1>Notifications</h1>
            </div>
            <div className="col-12">
                {isLoading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: "100px" }}>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        {announcements && announcements.length > 0 ? (
                            <div>
                                {sortAnnouncements(announcements).map((announcement, index) => (
                                    <div
                                        key={index}
                                        className="pt-2 pb-2 ps-1 pe-1 text-bg-secondary d-flex justify-content-between email-item"
                                        style={{ cursor: 'pointer', transition: 'background-color 0.3s' }}
                                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#bd2828')}
                                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '')}
                                    >
                                        <span className="ps-4 pe-5 fw-bold">{announcement.header}</span>
                                        <span className="text-truncate flex-fill pe-2">{announcement.body}</span>
                                        <span className="ps-4 pe-3 text-nowrap fw-bold">
                                            <b>{formatTimestamp(announcement.timestamp)}</b>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center">No announcements available.</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

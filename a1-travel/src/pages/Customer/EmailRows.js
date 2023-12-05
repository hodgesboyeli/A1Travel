import React, {useState} from 'react';

export default function EmailRows({emails}){
    const [toggleViews, setToggleViews] = useState(new Array(emails.length).fill(true));

    const toggleViewAtIndex = (index) => {
        const updatedToggleViews = toggleViews.map((item, idx) =>
            idx === index ? !item : item
        );
        setToggleViews(updatedToggleViews);
    };

    const formatTimestamp = (timestamp) => {
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

    const isSameWeek = (date1, date2) => {
        const startOfWeek = (date) => {
            const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1); // adjust when week starts
            return new Date(date.setDate(diff));
        }

        const startOfDate1 = startOfWeek(new Date(date1));
        const startOfDate2 = startOfWeek(new Date(date2));

        return startOfDate1.toDateString() === startOfDate2.toDateString();
    }

    return (
        emails.map((message, index) => (
            <div key={index}
                 className="pt-2 pb-2 ps-1 pe-1 d-flex justify-content-between email-item"
                 style={{ cursor: 'pointer'}}>
                <span className="ps-4 pe-5 fw-bold">
                    {message.senderID}
                </span>
                <span className={`${ !toggleViews[index] && 'text-truncate'} flex-fill pe-2`}
                    onClick={()=>toggleViewAtIndex(index)}>
                    {message.messageContent}
                </span>
                <span className="ps-4 pe-3 text-nowrap fw-bold">
                    {formatTimestamp(message.timestamp)}
                </span>
            </div>
        ))
    );
}
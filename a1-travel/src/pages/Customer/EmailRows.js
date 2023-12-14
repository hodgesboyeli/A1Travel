import React, {useState} from 'react';
import DateFormat from "../../components/DateFormat";

export default function EmailRows({emails}){
    const [toggleViews, setToggleViews] = useState(new Array(emails.length).fill(true));

    const toggleViewAtIndex = (index) => {
        const updatedToggleViews = toggleViews.map((item, idx) =>
            idx === index ? !item : item
        );
        setToggleViews(updatedToggleViews);
    };

    return (
        emails.map((message, index) => (
            <div key={index}
                 className="pt-2 pb-2 ps-1 pe-1 d-flex justify-content-between email-item"
                 style={{ cursor: 'pointer'}}>
                <span className="ps-4 pe-5 fw-bold">
                    {message.senderID}
                </span>
                <span className={`${ toggleViews[index] && 'text-truncate'} flex-fill pe-2`}
                    onClick={()=>toggleViewAtIndex(index)}>
                    {message.messageContent}
                </span>
                <span className="ps-4 pe-3 text-nowrap fw-bold">
                    {DateFormat(message.timestamp)}
                </span>
            </div>
        ))
    );
}
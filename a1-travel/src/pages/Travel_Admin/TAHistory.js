import React, {useState} from 'react';
import TravelAdminNavbar from "../../Navbars/TravelAdminNavbar";
import UserView from "./UserView";

export default function TAHistory(){
    const [users, setUsers] = useState([
        {
            firstName: "John",
            lastName: "Doe",
            email: "john1.doe@famu.edu",
            trips: [
                // ...trips data
            ],
        }
    ]);

    return (
        <>
            <TravelAdminNavbar/>
            <div className="d-grid text-center">
                <h1>Travel History</h1>
                {users.map((user, index) => (
                    <UserView key={index} user={user} />
                ))}
            </div>
        </>
    );
}
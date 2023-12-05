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
        },
        {
            firstName: "Joasdasdn",
            lastName: "Doeas",
            email: "john1.doasde@famu.edu",
            trips: [
                // ...trips data
            ],
        }
    ]);

    return (
        <>
            <TravelAdminNavbar/>
            <h1 className="text-center">Travel History</h1>
            <div className="d-flex flex-column align-content-center">
                {users.map((user, index) => (
                    <UserView key={index} user={user} />
                ))}
            </div>
        </>
    );
}
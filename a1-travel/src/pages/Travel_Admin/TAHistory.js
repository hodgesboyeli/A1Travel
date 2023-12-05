import React, {useEffect, useState} from 'react';
import TravelAdminNavbar from "../../Navbars/TravelAdminNavbar";
import UserView from "./UserView";
import Axios from "axios";

export default function TAHistory(){
    const [users, setUsers] = useState([]);
    useEffect( () =>{
        const fetchTrips = async ()=>{
            try {
                const response = await Axios.get('http://localhost:8080/api/trip/');
                const trips = response.data.trips;
                // Transform trips into users
                const usersMap = trips.reduce((acc, trip) => {
                    const userKey = `${trip.userID.userId}`; // Unique key for each user
                    if (!acc[userKey]) {
                        acc[userKey] = {
                            name: trip.userID.firstName+' '+trip.userID.lastName,
                            email: trip.userID.email,
                            trips: []
                        };
                    }
                    acc[userKey].trips.push(trip);
                    return acc;
                }, {});

                // Convert the users map to an array
                const usersArray = Object.values(usersMap);

                // Update state with transformed users
                setUsers(usersArray);
            } catch (e){
                console.log('error',e);
            }
        };
        fetchTrips().then();
    },[]);

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
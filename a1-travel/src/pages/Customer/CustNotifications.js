import React, {useRef, useState} from 'react';
import Navbar from '../Navbar';
import 'firebase/firestore';
import {Modal, Toast} from "bootstrap";
import Axios from "axios";

export default function CustNotifications() {
    return (
        <div>
            <Navbar/>
            <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                <h1>Notifications</h1>
            </div>
            <div className="col-12 d-flex justify-content-center">

            </div>
        </div>
    );
}
import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar";
import Axios from "axios";
import {Link} from "react-router-dom";

export default function CustCheckout() {

    return (
        <div>
            <Navbar/>
            <div className="mt-5">
                <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                    <h1>Checkout</h1>
                </div>
                <div className="container-fluid d-flex justify-content-center">
                    <Link to="/home">
                        <p>Pay Now</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

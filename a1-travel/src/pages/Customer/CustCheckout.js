import React, { useState, useEffect } from 'react';
import Navbar from "../../Navbars/Navbar";
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
                        <button type="submit" className="btn btn-md custom-button">
                            Pay Now
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

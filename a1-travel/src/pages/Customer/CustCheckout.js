import React from 'react';
import Navbar from "../../Navbars/Navbar";
import {Link} from "react-router-dom";

export default function CustCheckout(){
    return (
        <>
            <Navbar />
            <div className="mt-5" style={{ paddingTop: 50 }}>
                <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                    <h1>Checkout</h1>
                </div>
                <div className="text-center" style={{ marginTop: 40 }}>
                    <Link to="/home">
                        <button type="submit" className="btn btn-md custom-button">
                            Pay Now
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}
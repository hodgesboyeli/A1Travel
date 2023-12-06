import React from 'react';
import Navbar from "../../Navbars/Navbar";
import {Link} from "react-router-dom";

export default function CustEvent() {

    return (
        <div>
            <Navbar/>
            <div className="mt-5">
                <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                    <h1>Events</h1>
                </div>
                <div className="container-fluid d-flex justify-content-center">
                    <Link to="/checkout">
                        <button type="submit" className="btn btn-md custom-button">
                            Next
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

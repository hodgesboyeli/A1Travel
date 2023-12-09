import React from 'react';
import Navbar from "../../Navbars/Navbar";
import {Link} from "react-router-dom";

export default function CustCar(){
    return (
        <>
            <Navbar />
            <div className="mt-5" style={{ paddingTop: 50 }}>
                <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                    <h1>Choose your Car</h1>
                </div>
                <div className="text-center" style={{ marginTop: 40 }}>
                    <Link to="/lodging">
                        <button type="submit" className="btn btn-md custom-button">
                            Next
                        </button>
                    </Link>
                </div>
                <div className="text-center" style={{ marginTop: 40 }}>
                    <Link to="/lodging">
                        <div className="container-fluid d-flex justify-content-center">
                            <button className="btn btn-link" type="button">
                                Don't want to rent a car? CONTINUE HERE
                            </button>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}
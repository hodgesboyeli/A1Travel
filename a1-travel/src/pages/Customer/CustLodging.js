import React from 'react';
import Navbar from "../../Navbars/Navbar";
import {Link} from "react-router-dom";

export default function CustLodging(){
    return (
        <>
            <Navbar />
            <div className="mt-5" style={{ paddingTop: 50 }}>
                <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                    <h1>Where would you like to stay</h1>
                </div>
                <div className="text-center" style={{ marginTop: 40 }}>
                    <Link to="/hotel">
                        <button type="submit" className="btn btn-md custom-button">
                            Hotel
                        </button>
                    </Link>
                    <Link to="/airbnb">
                        <button type="submit" className="btn btn-md custom-button">
                            Airbnb
                        </button>
                    </Link>
                    <Link to="/event">
                        <div className="container-fluid d-flex justify-content-center">
                            <button className="btn btn-link" type="button">
                                Have a place to stay? CONTINUE HERE
                            </button>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}
import React, {useEffect, useState} from 'react';
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
                <div className="mt-5">
                    <div className="text-center">
                        <Link to="/hotel" onClick={() => sessionStorage.setItem('lodgingType', "Hotel")}>
                            <button type="submit" className="btn btn-md custom-button" style={{ fontSize: 40, paddingLeft: 300, paddingRight: 300, backgroundColor: "#1E71EE" }}>
                                Hotel
                            </button>
                        </Link>
                    </div>
                    <div className="text-center" style={{ marginTop: 40 }}>
                        <Link to="/airbnb" onClick={() => sessionStorage.setItem('lodgingType', "Airbnb")}>
                            <button type="submit" className="btn btn-md custom-button" style={{ fontSize: 40, paddingLeft: 300, paddingRight: 300 }}>
                                Airbnb
                            </button>
                        </Link>
                    </div>
                    <div className="text-center" style={{ marginTop: 40 }}>
                        <Link to="/event">
                            <div className="container-fluid d-flex justify-content-center">
                                <button className="btn btn-link" type="button">
                                    Have a place to stay? CONTINUE HERE
                                </button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
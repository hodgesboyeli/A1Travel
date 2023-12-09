import React from 'react';
import Navbar from "../../Navbars/Navbar";
import {Link} from "react-router-dom";

export default function CustTrain(){
    return (
        <>
            <Navbar />
            <div className="mt-5" style={{ paddingTop: 50 }}>
                <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                    <h1>Choose your Train</h1>
                </div>
                <div className="text-center" style={{ marginTop: 40 }}>
                    <Link to="/car">
                        <button type="submit" className="btn btn-md custom-button">
                            Next
                        </button>
                    </Link>
                </div>
                <div className="text-center" style={{ marginTop: 40 }}>
                    <Link to="/car">
                        <div className="container-fluid d-flex justify-content-center">
                            <button className="btn btn-link" type="button">
                                Don't want a train? CONTINUE HERE
                            </button>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}
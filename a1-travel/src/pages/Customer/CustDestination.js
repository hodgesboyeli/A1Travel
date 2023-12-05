import React, { useState } from 'react';
import Navbar from "../Navbar";
import {Link, useNavigate} from "react-router-dom";

export default function CustDestination() {

    return (
        <div>
            <Navbar/>
            <div className="mt-5" style={{paddingTop:50}}>
                <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                    <h1>Where do you want to go?</h1>
                </div>
                <div className="container-fluid d-flex justify-content-center">
                    {/*Search bar logic here*/}
                </div>
                <div className="text-center" style={{marginTop: 40}}>
                    <Link to="/flight">
                        <button type="submit" className="btn btn-md custom-button">
                            Next
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

import React from 'react';
import Navbar from "../../Navbars/Navbar";
import {Link} from "react-router-dom";

export default function CustHome(){
    return (
        <div>
            <Navbar/>
            <div className="mt-5" style={{paddingTop:50}}>
                <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                    <h1>May your journey begin</h1>
                </div>
                <div className="text-center" style={{marginTop: 40}}>
                    <Link to="/budget">
                        <button type="submit" className="btn btn-md custom-button" style={{fontSize: 32}}>
                            Create Trip
                            <div><i className="fas fa-plane"></i></div>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
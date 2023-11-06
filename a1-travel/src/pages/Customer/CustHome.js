import React from 'react'
import Navbar from "../Navbar";
import SearchBar from "../../SearchBar";

export default function CustHome(){
    return (
        <div>
            <Navbar/>
            <div className="mt-5" style={{paddingTop:50}}>
                <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
                    <h1 >May your journey begin</h1>
                </div>
                <SearchBar/>
                <div className="text-center" style={{marginTop: 40}}>
                    <button type="submit" className="btn btn-md custom-button">
                        Create Trip
                        <i className="fas fa-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}
import React from 'react';
import Navbar from "../../Navbars/Navbar";
import {Link} from "react-router-dom";

export default function CustLodging() {

    return (
        <>
            <Navbar/>
            <div className="container py-5">
                <header className="text-center mb-4">
                    <h1>A1 TRAVEL</h1>
                    <p className="lead text-muted">€ 772/2,500</p>
                </header>
                <section className="my-5">
                    <div className="d-flex flex-column align-items-center">
                        <h2 className="mb-4">WHERE DO YOU WANT TO STAY?</h2>

                        <div className="d-grid gap-2 col-6 mx-auto">
                            <button className="btn btn-lg other-button" type="button">HOTEL</button>
                            <button className="btn btn-lg custom-button" type="button">AIRBNB</button>
                            <Link to="/event">
                                <div className="container-fluid d-flex justify-content-center">
                                    <button className="btn btn-link" type="button">
                                        STAYING ELSEWHERE? CONTINUE HERE
                                    </button>
                                </div>
                            </Link>

                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

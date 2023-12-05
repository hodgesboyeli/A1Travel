import React, { useState } from 'react';
import Navbar from "../Navbar";
import {Link, useNavigate} from "react-router-dom";

export default function CustBudget() {
    const [budget, setBudget] = useState('');
    const navigate = useNavigate();

    const formatNumber = (value) => {
        // Remove all non-digit characters
        const numericValue = value.replace(/[^\d]/g, '');

        // Format the number with commas
        return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const handleBudgetChange = (e) => {
        const val = e.target.value.replace(/,/g,'');
        setBudget(formatNumber(val));
    };

    const handleSubmit = () => {
        // Handle the submit action here
        // add logic for storing budget number into session storage
        console.log('Budget submitted:', budget);

        navigate('/destination');
    };

    return (
        <>
            <Navbar/>
            <div className="mt-5 text-center">
                    <h1 className="text-center">Budget</h1>
                <section className="my-5">
                    <div className="d-flex flex-column align-items-center">
                        <h2 className="mb-3">WHAT IS YOUR BUDGET?</h2>
                        <div className="input-group input-group-lg mb-3 col-6 w-auto">
                            <span className="input-group-text">$</span>
                            <input
                                type="text"
                                className="form-control"
                                value={budget}
                                placeholder='Enter amount'
                                onChange={handleBudgetChange}
                            />
                                <button className="btn btn-success" onClick={handleSubmit}>
                                    Confirm
                                </button>
                        </div>
                    </div>
                </section>
                <div className="container-fluid d-flex justify-content-center">
                    <Link to="/destination">
                        <button type="submit" className="btn btn-md custom-button">
                            Next
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}

import React, { useState } from 'react';
import Navbar from "../Navbar";
import { Link, useNavigate } from "react-router-dom";

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
        const val = e.target.value.replace(/,/g, '');
        setBudget(formatNumber(val));
    };

    const handleSubmit = () => {
        // Parse the budget string to a number
        const budgetNumber = parseInt(budget.replace(/,/g, ''), 10);

        // Check if the entered value is a valid number
        if (!isNaN(budgetNumber)) {
            console.log('Valid budget input:', budgetNumber);

            // Store the budget number in session storage using the field name from the database
            sessionStorage.setItem('budget', budgetNumber);
            console.log('Budget stored in session storage:', budgetNumber);

            // Navigate to the destination page
            navigate('/destination');
        } else {
            // Handle invalid budget input (optional)
            console.log('Invalid budget input');
            // You can show an error message to the user if needed
        }
    };

    const handleNoBudgetContinue = () => {
        // Set the budget in session storage to -1
        sessionStorage.setItem('budget', -1);
        console.log('Budget stored in session storage:', -1);

        // Navigate to the destination page
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
                    <button className="btn btn-link" type="button" onClick={handleNoBudgetContinue}>
                        No budget? CONTINUE HERE
                    </button>
                </div>
            </div>
        </>
    );
}

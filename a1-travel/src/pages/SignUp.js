import React from 'react';
import {Link} from "react-router-dom";

export default function SignUp() {
    return (
        <div className="page-style">
            <div className="container justify-content-center">
                <div className="container-fluid d-flex justify-content-center">
                    <p className="brand-name h2 mb-4" style={{color: "#FF6C37", paddingTop: 30}}>
                        A1 TRAVEL
                    </p>
                </div>
                <div className="text-center mb-3">
                    <img src={process.env.PUBLIC_URL + "/A1Logo.png"} className="img-fluid" alt="A1 Travel Logo" />
                </div>
                <div className="container-fluid d-flex justify-content-center">
                    <p className="h2 mb-4" style={{color: "white", paddingTop: 40}}>
                        SIGN UP
                    </p>
                </div>
            </div>
            <div className="element signin-form-movement container-fluid d-flex justify-content-center">
                <form className="w-25 row">
                    <div className="mb-3">
                        <input type="text" className="form-control" id="inputFirstName" placeholder="FIRST NAME" />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="inputLastName" placeholder="LAST NAME" />
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control" id="inputEmail" placeholder="EMAIL" />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="inputUsername" placeholder="USERNAME" />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" id="inputPassword" placeholder="PASSWORD" />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-sm custom-button">CREATE ACCOUNT</button>
                    </div>
                    <div className="p text-center mt-3 mb-3">
                        <Link to="/login">ALREADY HAVE ACCOUNT? SIGN IN</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

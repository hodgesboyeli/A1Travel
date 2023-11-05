import React from 'react';
import {Link} from "react-router-dom";

export default function Login() {
    return (
        <div className="pageStyle">
            <div className="container justify-content-center">
                <div className="container-fluid d-flex justify-content-center">
                    <p className="brand-name h2 mb-3" style={{color: "#FF6C37", paddingTop: 60}}>
                        A1 TRAVEL
                    </p>
                </div>
                <div className="text-center mt-3">
                    <img src={process.env.PUBLIC_URL + "/A1Logo.png"} className="img-fluid" alt="A1 Travel Logo" />
                </div>
                <div className="container-fluid d-flex justify-content-center">
                    <p className="h2" style={{color: "white", paddingTop: 60}}>
                        LOGIN
                    </p>
                </div>
            </div>

            <div className="signin-form-movement container-fluid d-flex justify-content-center">
                <form className="w-25">
                    <div className="mb-3">
                        <input type="text" className="form-control" id="inputUsername" placeholder="USERNAME" />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" id="inputPassword" placeholder="PASSWORD" />
                    </div>
                    <div className="text-center" style={{marginTop: 30}}>
                        <button type="submit" className="btn btn-sm custom-button">SIGN IN</button>
                    </div>
                    <div className="text-center mt-3">
                        <Link to="/signup">Create an account</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

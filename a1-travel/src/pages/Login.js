import React, { useState} from 'react';
import {Link} from "react-router-dom";
import {app} from "../Firebase";
import { signInWithEmailAndPassword, getAuth} from "firebase/auth";
import Axios from "axios";

export default function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth(app);
            const user = await signInWithEmailAndPassword(auth,email,pass);
            console.log(email);
            const response = await Axios.post('http://localhost:8080/api/login',{ email: email });
            const jwtToken = response.data;

            console.log('JWT Token: ',jwtToken);
        } catch (error){
            console.log('oops!');
            console.log(error.message);
        }
    };
    return (<div className="page-style">
        <div className="container justify-content-center">
            <div className="container-fluid d-flex justify-content-center">
                <p className="brand-name h2 mb-3" style={{color: "#FF6C37", paddingTop: 55}}>
                    A1 TRAVEL
                </p>
            </div>
            <div className="text-center mt-3">
                <img src={process.env.PUBLIC_URL + "/A1Logo.png"} className="img-fluid" alt="A1 Travel Logo" />
            </div>
            <div className="container-fluid d-flex justify-content-center">
                <p className="h2" style={{color: "white", paddingTop: 55}}>
                    LOGIN
                </p>
            </div>
        </div>
        <div className="signin-form-movement container-fluid d-flex justify-content-center" >
            <form className="w-25 row" onSubmit={handleLogin}>
                <div className="mb-3">
                    <input type="text" className="form-control" id="inputUsername" placeholder="USERNAME"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control" id="inputPassword" placeholder="PASSWORD"
                    value={pass}
                    onChange={(e)=>setPass(e.target.value)}/>
                </div>
                <div className="text-center" style={{marginTop: 40}}>
                    <button type='submit' className="btn btn-sm custom-button">
                        SIGN IN
                    </button>
                </div>
                <div className="text-center mt-4">
                    <Link to="/signup">CREATE AN ACCOUNT</Link>
                </div>
            </form>
        </div>
    </div>);
}

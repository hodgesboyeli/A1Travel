import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { app, db } from '../Firebase';
import { doc, setDoc } from "firebase/firestore";

export default function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSignUp = async (e) => {
        e.preventDefault();
        const auth = getAuth(app);

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);

            if (response.user) {
                // After successful registration, add user data to Firestore
                const userRef = doc(db, 'Users', response.user.uid); // 'Users' is the Firestore collection name
                const userData = {
                    firstName,
                    lastName,
                    email,
                    username,
                };
                await setDoc(userRef, userData); // Add user data to Firestore

                console.log('User signed up successfully');
            } else {
                console.error('Sign-up failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="pageStyle">
            <div className="container justify-content-center">
                <div className="container-fluid d-flex justify-content-center">
                    <p className="brand-name h2 mb-4" style={{ color: "#FF6C37", paddingTop: 30 }}>
                        A1 TRAVEL
                    </p>
                </div>
                <div className="text-center mb-3">
                    <img src={process.env.PUBLIC_URL + "/A1Logo.png"} className="img-fluid" alt="A1 Travel Logo" />
                </div>
                <div className="container-fluid d-flex justify-content-center">
                    <p className="h2 mb-4" style={{ color: "white", paddingTop: 40 }}>
                        SIGN UP
                    </p>
                </div>
            </div>
            <div className="element signin-form-movement container-fluid d-flex justify-content-center">
                <form className="w-25 row" onSubmit={handleSignUp}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="inputFirstName"
                            placeholder="FIRST NAME"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="inputLastName"
                            placeholder="LAST NAME"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="inputEmail"
                            placeholder="EMAIL"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="inputUsername"
                            placeholder="USERNAME"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="inputPassword"
                            placeholder="PASSWORD"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
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

import React, {useRef, useState} from 'react';
import {useAuth} from './AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import axios from "axios"

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const {login} = useAuth()
    const [error, setError] = useState('')
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const currentUser = useAuth()
    const [user,setUser] = useState({})
    const auth = getAuth();
    async function handleSubmit(e) { // added async to fix await error
        console.log("Yoooo, we running, gang.)")
        e.preventDefault()
        try {
            console.log("Try catch")
            setError('')
            setLoading(true)
            console.log("Loading...")
            console.log("Before login call");
            console.log(emailRef.current.value)
            console.log(passwordRef.current.value)
            await signInWithEmailAndPassword(getAuth(), emailRef.current.value, passwordRef.current.value);
            console.log("After login call");
            try {
                var response = await axios.get('http://localhost:8080/api/user/email/'+emailRef.current.value)
                if(response.status === 404) throw response.statusText

                let user = response.data

                console.log(user.user_email)
                console.log(emailRef.current.value)
                if (user.user_email !== emailRef.current.value ) throw "Invalid Credentials";

                if(!user.user_active) throw 'User is Deactivated or Paused';

                sessionStorage.clear()
                sessionStorage.setItem("role",user.user_role)

            } catch(err) {
                console.log(err)
                setError(err)
            }

            console.log("I said...we runnin")

            console.log(currentUser)

            if (sessionStorage.getItem('role') ==="Customer"){
                navigate('/home')
            }else if (sessionStorage.getItem('role') === "Administrator"){
                navigate('/admin-home')
            }else if (sessionStorage.getItem('role') === "Travel Administrator"){
                navigate('/ta-home/')
            }else{
                console.log("Invalid user role value, returning to login.")
                navigate('/login')
            }
        } catch {
            setError('Failed to sign in')
        }
        setLoading(false)
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
            <form className="w-25 row" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="email" className="form-control" id="email" placeholder="USERNAME"
                    ref={emailRef}/>
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control" id="password" placeholder="PASSWORD"
                    ref={passwordRef}/>
                </div>
                <div className="text-center" style={{marginTop: 40}}>
                    <button disabled={loading} type='submit' className="btn btn-sm custom-button">
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

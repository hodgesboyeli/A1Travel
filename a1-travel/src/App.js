import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import CustHome from "./pages/Customer/CustHome";
import Main from "./pages/Main";
import Navbar from "./pages/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import './styles.css';
import TAHome from "./pages/Travel_Admin/TAHome";
import AdminHome from "./pages/Admin/AdminHome";
import DatabaseManagement from "./pages/Travel_Admin/Database Management";
import UserSearch from "./pages/Admin/User Search";
import {getAuth, signOut} from "firebase/auth";
import {app, auth} from "./Firebase";

function App() {
    const [name,setName] = useState('');
    const checkUser = getAuth(app).onAuthStateChanged((u)=>{
        setName( u ? u.email : 'No User');
        return name;
    });
    useEffect(()=>{
        return () => {
            checkUser();
        }
    }, []);
    const signUserOut = () =>{
        try{
            signOut(getAuth(app)).then();
        } catch (error){
            console.log(error.message);
        }
    };
    return (
        <Router>
            <Routes>
                <Route element={<CustHome />} path='/home'/>
                <Route element={<Main />} path=''/>
                <Route element={<Login />} path='/login'/>
                <Route element={<SignUp />} path='/signup'/>
                <Route element={<TAHome />} path='/ta-home'/>
                <Route element={<AdminHome />} path='/admin-home'/>
                <Route element={<DatabaseManagement />} path='/travel_admin/database-management'/>
                <Route element={<UserSearch />} path='/admin/user-search'/>
            </Routes>
            <div className='col inViewB'>
                {name}
                <button className='btn btn-secondary p-1' onClick={signUserOut}>
                    sign out
                </button>
            </div>
        </Router>
    );
}

export default App;

import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import CustHome from "./pages/CustHome";
import Main from "./pages/Main";
import Navbar from "./pages/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import './styles.css';
import TAHome from "./pages/TAHome";
import AdminHome from "./pages/AdminHome";

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<CustHome />} path='/home'/>
                <Route element={<Main />} path=''/>
                <Route element={<Login />} path='/login'/>
                <Route element={<SignUp />} path='/signup'/>
                <Route element={<TAHome />} path='/tahome'/>
                <Route element={<AdminHome />} path='/adminhome'/>
            </Routes>
        </Router>
    );
}

export default App;

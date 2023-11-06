import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import CustHome from "./pages/CustHome";
import Main from "./pages/Main";
import Navbar from "./pages/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import './styles.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<CustHome />} path='/home'/>
                <Route element={<Main />} path=''/>
                <Route element={<Login />} path='/login'/>
                <Route element={<SignUp />} path='/signup'/>
            </Routes>
        </Router>
    );
}

export default App;

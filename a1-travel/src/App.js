import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Main from "./pages/Main";

function App() {
    return (
        <Router>
            <div className="header">
                <nav className="navbar" style={{backgroundColor: "#1E71EE"}}>
                    <div className="container-fluid">
                        <a className="navbar-brand" >Home </a>
                        <a className="navbar-brand" >Past Bookings </a>
                        <a className="navbar-brand" >Support </a>
                        <a className="navbar-brand" >Support </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </nav>
            </div>
            <Routes>
                <Route element={<Home />} path='/home'/>
                <Route element={<Main />} path=''/>
            </Routes>
        </Router>
    );
}

export default App;

import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Main from "./pages/Main";

function App() {
    return (
        <Router>
            <div className="header">
                <nav className="navbar navbar-expand-lg" style={{backgroundColor: "#1E71EE"}}>
                    <a className="navbar-brand" href="#">A1 Travel</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Past Bookings</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Support</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Profile</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Settings</a>
                            </li>
                        </ul>
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

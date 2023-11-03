import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import './styles.css';
function App() {
    return (
        <Router>
            <Menu />
            <Routes>
                <Route element={<Home />} path='/home'/>
                <Route element={<Main />} path=''/>
                <Route element={<Login />} path='/login'/>
            </Routes>
        </Router>
    );
}

export default App;

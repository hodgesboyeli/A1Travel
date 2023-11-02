import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Main from "./pages/Main";

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<Home />} path='/home'/>
                <Route element={<Main />} path=''/>
            </Routes>
        </Router>
    );
}

export default App;

import React from 'react';
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

function App() {
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
        </Router>
    );
}

export default App;

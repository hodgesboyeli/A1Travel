import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import CustHome from "./pages/Customer/CustHome";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import './styles.css';
import TAHome from "./pages/Travel_Admin/TAHome";
import AdminHome from "./pages/Admin/AdminHome";
import DatabaseManagement from "./pages/Travel_Admin/Database Management";
import UserSearch from "./pages/Admin/User Search";
import {AuthProvider} from "./pages/AuthContext";
import CustomerRoutes from "./Routes/CustomerRoutes";
import TravelAdminRoutes from "./Routes/TravelAdminRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import CustInbox from "./pages/Customer/CustInbox";
import TAInbox from "./pages/Travel_Admin/TAInbox";
import AdminInbox from "./pages/Admin/AdminInbox";
import CustNotifications from "./pages/Customer/CustNotifications";
import AdminNotifications from "./pages/Admin/AdminNotifications";
import TANotifications from "./pages/Travel_Admin/TANotifications";
import CreateAnnouncements from "./pages/Admin/Create Announcements";

function App() {
    return (
        <AuthProvider>

            <Router>

                <Routes>

                    <Route element={<Login />} path='/'/>
                    <Route element={<Login />} path='/login'/>
                    <Route element={<SignUp />} path='/signup'/>

                    <Route element={<CustomerRoutes/>}>
                        <Route element={<CustHome />} path='/home'/>
                        <Route element={<CustInbox />} path='/inbox'/>
                        <Route element={<CustNotifications />} path='/notifications'/>
                    </Route>

                    <Route element={<TravelAdminRoutes/>}>
                        <Route element={<TAHome />} path='/ta-home'/>
                        <Route element={<DatabaseManagement />} path='/travel_admin/database-management'/>
                        <Route element={<TAInbox />} path='/ta-inbox'/>
                        <Route element={<TANotifications />} path='/ta-notifications'/>
                    </Route>


                    <Route element={<AdminRoutes/>}>
                        <Route element={<AdminHome />} path='/admin-home'/>
                        <Route element={<UserSearch />} path='/admin/user-search'/>
                        <Route element={<CreateAnnouncements />} path = '/admin/create-announcements'/>
                        <Route element={<AdminInbox />} path='/admin-inbox'/>
                        <Route element={<AdminNotifications />} path='/admin-notifications'/>
                    </Route>

                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;

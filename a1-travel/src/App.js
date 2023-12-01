import React from 'react';
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
import CustFlight from "./pages/Customer/CustFlight";

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
                        <Route element={<CustFlight />} path='/flight'/>
                    </Route>

                    <Route element={<TravelAdminRoutes/>}>
                        <Route element={<TAHome />} path='/ta-home'/>
                        <Route element={<DatabaseManagement />} path='/travel_admin/database-management'/>
                    </Route>


                    <Route element={<AdminRoutes/>}>
                        <Route element={<AdminHome />} path='/admin-home'/>
                        <Route element={<UserSearch />} path='/admin/user-search'/>
                    </Route>

                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;

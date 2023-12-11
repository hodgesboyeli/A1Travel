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
import CustInbox from "./pages/Customer/CustInbox";
import TAInbox from "./pages/Travel_Admin/TAInbox";
import AdminInbox from "./pages/Admin/AdminInbox";
import CustNotifications from "./pages/Customer/CustNotifications";
import AdminNotifications from "./pages/Admin/AdminNotifications";
import TANotifications from "./pages/Travel_Admin/TANotifications";
import CreateAnnouncements from "./pages/Admin/Create Announcements";
import CustEvent from "./pages/Customer/CustEvent";
import CustCheckout from "./pages/Customer/CustCheckout";
import CustLodging from "./pages/Customer/CustLodging";
import CustDestination from "./pages/Customer/CustDestination";
import CustBudget from "./pages/Customer/CustBudget";
import CustFlightToDestination from "./pages/Customer/CustFlightToDestination";
import TAHistory from "./pages/Travel_Admin/TAHistory";
import CustBookings from "./pages/Customer/CustBookings";
import CustTrain from "./pages/Customer/CustTrain";
import CustAirbnb from "./pages/Customer/CustAirbnb";
import CustCar from "./pages/Customer/CustCar";
import CustHotel from "./pages/Customer/CustHotel";
import CustFlightFromDestination from "./pages/Customer/CustFlightFromDestination";
import EmailView from "./pages/Customer/EmailView";

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
                        <Route element={<CustInbox />} exact path='/inbox'/>
                        <Route element={<CustNotifications />} path='/notifications'/>
                        <Route element={<CustBookings />} path='/history'/>
                        <Route element={<CustFlightToDestination />} path='/flight-to-destination'/>
                        <Route element={<CustFlightFromDestination />} path='/flight-from-destination'/>
                        <Route element={<CustBudget />} path='/budget'/>
                        <Route element={<CustDestination />} path='/destination'/>
                        <Route element={<CustLodging />} path='/lodging'/>
                        <Route element={<CustCheckout />} path='/checkout'/>
                        <Route element={<CustEvent />} path='/event'/>
                        <Route element={<CustTrain />} path='/train'/>
                        <Route element={<CustHotel />} path='/hotel'/>
                        <Route element={<CustCar />} path='/car'/>
                        <Route element={<CustAirbnb />} path='/airbnb'/>
                    </Route>

                    <Route element={<TravelAdminRoutes/>}>
                        <Route element={<TAHistory />} path='/ta/travel-history'/>
                        <Route element={<DatabaseManagement />} path='/ta/database-management'/>
                        <Route element={<TAInbox />} path='/ta/inbox'/>
                        <Route element={<TANotifications />} path='/ta/notifications'/>
                        <Route element={<TAHome />} path='/ta'/>
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

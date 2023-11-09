import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";


export default function TravelAdminRoutes() {
    const { currentUser } = useAuth();

    if (currentUser && (sessionStorage.getItem("role") === 'Travel Administrator')){
        return <Outlet/>
    }
    else{
        return <Navigate to="/login" />;
    }
}
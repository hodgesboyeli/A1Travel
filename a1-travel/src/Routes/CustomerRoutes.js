import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";


export default function CustomerRoutes() {
    const { currentUser } = useAuth();

    if (currentUser && (sessionStorage.getItem("role") === 'Customer')){
        return <Outlet/>
    }
    else{
        return <Navigate to="/login" />;
    }
}
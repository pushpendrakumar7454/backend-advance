import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const PublicProtectedRoute = () => {
    const { users,isLoading } = useSelector((state) => state.auth);

    // Jab tak user check ho raha hai
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-xl font-semibold">
                    Loading...
                </h1>
            </div>
        );
    }

    // User hai aur role user hai
    if (users?.role === "user") {
        return <Navigate to="/user-header" replace />;
    }

    // User hai aur role seller hai
    if (users?.role === "seller") {
        return <Navigate to="/seller-header" replace />;
    }

    // User login nahi hai
    return <Outlet />;
};

export default PublicProtectedRoute;
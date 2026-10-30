
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const PublicProtectedRoute = () => {
    const { users, isLoading } = useSelector(
        (state) => state.auth
    );

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    if (users?.role === "user") {
        return <Navigate to="/user-header" replace />;
    }

    if (users?.role === "seller") {
        return <Navigate to="/seller-header" replace />;
    }

    return <Outlet />;
};

export default PublicProtectedRoute;

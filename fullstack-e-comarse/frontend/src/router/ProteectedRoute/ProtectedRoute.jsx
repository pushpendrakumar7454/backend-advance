
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
    const { users, isLoading } = useSelector(
        (state) => state.auth
    );

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-xl font-semibold">
                    Loading...
                </h1>
            </div>
        );
    }

    if (!users) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;

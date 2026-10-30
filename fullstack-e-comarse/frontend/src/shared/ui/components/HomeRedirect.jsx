
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const HomeRedirect = () => {
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

    if (users.role === "user") {
        return <Navigate to="/user-header" replace />;
    }

    if (users.role === "seller") {
        return <Navigate to="/seller-header" replace />;
    }

    return <Navigate to="/login" replace />;
};

export default HomeRedirect;

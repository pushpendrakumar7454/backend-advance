import React from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";

const HomeRedirect = () => {
  const { users } = useSelector((state) => state.auth);

  if (!users) {
    return <Navigate to="/login" replace />;
  }

  if (users?.role === "seller") {
    return <Navigate to="/seller-header" replace />;
  }

  if (users?.role === "user") {
    return <Navigate to="/user-header" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default HomeRedirect;
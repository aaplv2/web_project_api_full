import React from "react";
import { Navigate } from "react-router-dom";

export default function ({ loggedIn, children }) {
  if (!loggedIn) {
    return <Navigate to="/signin" />;
  }
  return children;
}

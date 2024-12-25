import React from "react";
import { useLocation, Navigate } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    } else {
      if (user?.role === "admin") {
        return <Navigate to={"/admin/dashboard"} />;
      } else {
        return <Navigate to={"/shop/home"} />;
      }
    }
  }

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/auth/login") ||
      location.pathname.includes("/auth/register")
    )
  ) {
    return <Navigate to={"/auth/login"} />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/auth/login") ||
      location.pathname.includes("/auth/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to={"/admin/dashboard"} />;
    } else {
      return <Navigate to={"/shop/home"} />;
    }
  }

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to={"/admin/dashboard"} />;
  }

  if (
    isAuthenticated &&
    user?.role === "user" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to={"/un-auth"} />;
  }

  return <>{children}</>;
}

export default CheckAuth;

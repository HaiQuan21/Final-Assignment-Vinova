import { Navigate, Outlet } from "react-router-dom";

function isAuthenticated() {
  return !!(
    localStorage.getItem("accessToken") &&
    localStorage.getItem("currentUser")
  );
}

export function PublicRoute() {
  return isAuthenticated() ? (
    <Navigate to="/account" replace />
  ) : (
    <Outlet />
  );
}

export function PrivateRoute() {
  return isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
}
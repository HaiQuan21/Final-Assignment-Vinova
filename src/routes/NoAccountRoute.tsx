
import { Navigate, Outlet } from "react-router-dom";

export default function NoAccountRoute() {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("currentUser");

  const isAuthenticated = token && user;

  return isAuthenticated
    ? <Navigate to="/" replace />
    : <Outlet />;
}
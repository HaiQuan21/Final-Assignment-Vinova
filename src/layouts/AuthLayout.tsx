import { Outlet } from "react-router-dom";
import logo from "../assets/logo.svg"

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <img src={logo} alt=""/>
      <Outlet />
    </div>
  );
}
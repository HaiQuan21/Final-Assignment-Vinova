import { Outlet } from "react-router-dom";
import logo from "../assets/logo.svg"
import backgroundAuth from "../assets/bg-auth.png"
export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5"
    style={{
      backgroundImage: `url(${backgroundAuth})`,
    }}
    >
      <img src={logo} alt=""/>
      <Outlet />
    </div>
  );
}
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-[url('/src/assets/bg-auth.png')] bg-gray-100 flex items-center justify-center p-5"
    >
      <Outlet />
    </div>
  );
}
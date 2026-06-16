import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen font-[Montserrat]">
        <Outlet/>
    </div>
  )
}

export default MainLayout
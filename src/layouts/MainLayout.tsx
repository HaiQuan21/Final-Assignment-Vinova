import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Toolbar from "../components/Toolbar";
import { navItems, accountItem } from "../constants/navigation";

function MainLayout() {
  const { pathname } = useLocation();

  const allItems = [...navItems, accountItem];
  const currentItem = allItems.find((item) => pathname.startsWith(item.path));
  const title = currentItem?.label ?? "Dashboard";

  return (
    <div className="flex min-h-screen font-[Montserrat]">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-white">
        <Toolbar title={title} formType={currentItem?.formType} />
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
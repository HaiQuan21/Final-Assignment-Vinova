import { Outlet, useLocation,useParams  } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Toolbar from "../components/Toolbar";
import { navItems,accountSubItems } from "../constants/navigation";

function MainLayout() {
  const { pathname } = useLocation();

  const allItems = [...navItems, ...accountSubItems];
  const currentItem = allItems.find((item) => pathname.startsWith(item.path));
  const title = currentItem?.label ?? "None";

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
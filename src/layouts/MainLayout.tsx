import { Outlet, useLocation, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Toolbar from "../components/Toolbar";
import { navItems, accountSubItems } from "../constants/navigation";
import type { BreadcrumbItem } from "../components/Breadcrumb";

function MainLayout() {
  const { pathname,state } = useLocation();

  const allItems = [...navItems, ...accountSubItems];
  const currentItem = allItems.find((item) => pathname.startsWith(item.path));

  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1];

  const title = currentItem?.label ?? "None";

  const isDetailPage = lastSegment !== currentItem?.path.split("/").pop()
  && lastSegment?.includes("-")
  && lastSegment?.length > 8;

const breadcrumbs: BreadcrumbItem[] = currentItem
  ? [
      ...(currentItem.breadcrumb ?? []),
      {
        label: currentItem.label,
        path: isDetailPage ? currentItem.path : undefined,
      },
      ...(isDetailPage
        ? [{ label: (state as any)?.detailLabel ?? lastSegment }]
        : []),
    ]
  : [];
  return (
    <div className="flex min-h-screen font-[Montserrat]">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-[#F6F8FA]">
        <Toolbar
          title={title}
          formType={breadcrumbs.length <= 1 ? currentItem?.formType : undefined}
          breadcrumbs={breadcrumbs}
          isDetailPage={isDetailPage}
        />
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;

import { Link, useLocation } from "react-router-dom";

export interface BreadcrumbItem {
  label: string;
  path?: string; // không có path → item cuối, không click được
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-1 text-sm text-gray-500">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={index} className="flex items-center gap-1">
            {index !== 0 && <span className="text-gray-400">/</span>}

            {isLast || !item.path ? (
              
              <span className="text-gray-800 font-medium">{item.label}</span>
            ) : (
              // Có path → click được, hover underline
              <Link
                to={item.path}
                className="hover:underline hover:text-gray-800 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;
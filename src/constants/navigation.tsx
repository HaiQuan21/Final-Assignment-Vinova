import {
  HiOutlineDesktopComputer,
  HiOutlineUserGroup,
  HiOutlineChatAlt2,
  HiOutlineCalculator,
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineTicket,
  HiOutlineDocumentText,
  HiOutlineSearchCircle,
} from "react-icons/hi";
import type { IconType } from "react-icons";
export type FormType =
  | "article"
  | "voucher"
  | "pd"
  | "admin"
  | "doula"
  | "client"
  | "category"
  | "subscriptions"
  | "help-documents"
  | "search-settings"
  | "static-content";

export interface NavItem {
  label: string;
  path: string;
  icon: IconType;
  formType?: FormType;
  breadcrumb?: { label: string; path: string }[];
}

export const navItems: NavItem[] = [
  {
    label: "Static Content",
    path: "/static-content",
    icon: HiOutlineDesktopComputer,
    formType: "static-content",
    breadcrumb: [{ label: "Static-Content", path: "/static-content" }],
  },
  {
    label: "Article",
    path: "/articles",
    icon: HiOutlineChatAlt2,
    formType: "article",
    breadcrumb: [{ label: "Article", path: "/articles" }],
  },
  {
    label: "PD Session",
    path: "/pd-session",
    icon: HiOutlineCalculator,
    formType: "pd",
    breadcrumb: [{ label: "PD Session", path: "/pd-session" }],
  },
  {
    label: "Category",
    path: "/category",
    icon: HiOutlineViewGrid,
    formType: "category",
    breadcrumb: [{ label: "Category", path: "/category" }],
  },
  {
    label: "Subscriptions",
    path: "/subscriptions",
    icon: HiOutlineCube,
    formType: "subscriptions",
    breadcrumb: [{ label: "Subscriptions", path: "/subscriptions" }],
  },
  {
    label: "Voucher",
    path: "/vouchers",
    icon: HiOutlineTicket,
    formType: "voucher",
    breadcrumb: [{ label: "Voucher", path: "/vouchers" }],
  },
  {
    label: "Help Documents",
    path: "/help-documents",
    icon: HiOutlineDocumentText,
    formType: "help-documents",
    breadcrumb: [{ label: "Hellp Documents", path: "/help-documents" }],
  },
  {
    label: "Search Settings",
    path: "/search-settings",
    icon: HiOutlineSearchCircle,
    formType: "search-settings",
    breadcrumb: [{ label: "Search Settings", path: "/search-settings" }],
  },
];

export interface SubNavItem {
  label: string;
  path: string;
  formType?: FormType;
  breadcrumb?: { label: string; path: string }[];
}

export const accountSubItems: SubNavItem[] = [
  {
    label: "Admin Management",
    path: "/account/admin",
    formType: "admin",
    breadcrumb: [{ label: "Account", path: "/account/admin" }],
  },
  {
    label: "Doula Management",
    path: "/account/doula",
    formType: "doula",
    breadcrumb: [{ label: "Account", path: "/account/doula" }],
  },
  {
    label: "Client Management",
    path: "/account/client",
    formType: "client",
    breadcrumb: [{ label: "Account", path: "/account/client" }],
  },
];

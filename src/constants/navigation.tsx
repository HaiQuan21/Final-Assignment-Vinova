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
  | "static-content"

export interface NavItem {
  label: string;
  path: string;
  icon: IconType;
  formType?: FormType;
}

export const navItems: NavItem[] = [
  {
    label: "Static Content",
    path: "/static-content",
    icon: HiOutlineDesktopComputer,
    formType: "static-content",
  },
  {
    label: "Article",
    path: "/articles",
    icon: HiOutlineChatAlt2,
    formType: "article",
  },
  {
    label: "PD Session",
    path: "/pd-session",
    icon: HiOutlineCalculator,
    formType: "pd",
  },
  { label: "Category", path: "/category", icon: HiOutlineViewGrid, formType: "category" },
  { label: "Subscriptions", path: "/subscriptions", icon: HiOutlineCube, formType: "subscriptions" },
  {
    label: "Voucher",
    path: "/vouchers",
    icon: HiOutlineTicket,
    formType: "voucher",
  },
  {
    label: "Help Documents",
    path: "/help-documents",
    icon: HiOutlineDocumentText,
    formType: "help-documents",
  },
  {
    label: "Search Settings",
    path: "/search-settings",
    icon: HiOutlineSearchCircle,
    formType: "search-settings",
  },
];

export interface SubNavItem {
  label: string;
  path: string;
  formType?: FormType;
}

export const accountSubItems: SubNavItem[] = [
  {
    label: "Admin Management",
    path: "/account/admin",
    formType: "admin",
  },
  { label: "Doula Management", path: "/account/doula", formType:"doula" },
  { label: "Client Management", path: "/account/client",formType:"client" },
];

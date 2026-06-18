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
  
  export interface NavItem {
    label: string;
    path: string;
    icon: IconType;
  }
  
  export const navItems: NavItem[] = [
    { label: "Static Content", path: "/static-content", icon: HiOutlineDesktopComputer },
    { label: "Article", path: "/articles", icon: HiOutlineChatAlt2 },
    { label: "PD Session", path: "/pd-session", icon: HiOutlineCalculator },
    { label: "Category", path: "/category", icon: HiOutlineViewGrid },
    { label: "Subscriptions", path: "/subscriptions", icon: HiOutlineCube },
    { label: "Voucher", path: "/vouchers", icon: HiOutlineTicket },
    { label: "Help Documents", path: "/help-documents", icon: HiOutlineDocumentText },
    { label: "Search Settings", path: "/search-settings", icon: HiOutlineSearchCircle },
  ];
  
  export const accountItem: NavItem = {
    label: "Account",
    path: "/account",
    icon: HiOutlineUserGroup,
  };
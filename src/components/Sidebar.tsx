import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HiMenu,
  HiChevronDown,
  HiDotsHorizontal,
  HiOutlineUserGroup,
  HiLogout,
} from "react-icons/hi";
import type { Admin } from "../api/apiService";
import { navItems, accountItem } from "../constants/navigation";

function getCurrentUser(): Admin | null {
  try {
    const raw = localStorage.getItem("currentUser");
    return raw ? (JSON.parse(raw) as Admin) : null;
  } catch {
    return null;
  }
}

function getDisplayName(admin: Admin | null) {
  if (!admin) return "Super Admin";
  const fullName = `${admin.firstName} ${admin.lastName}`.trim();
  return fullName || admin.username;
}

function getAvatarLetter(admin: Admin | null) {
  if (!admin) return "A";
  return (admin.firstName?.[0] ?? admin.username?.[0] ?? "A").toUpperCase();
}

function Sidebar() {
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const [accountsOpen, setAccountsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const admin = getCurrentUser();
  const displayName = getDisplayName(admin);
  const avatarLetter = getAvatarLetter(admin);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUserMenuOpen(false);
    navigate("/login");
  };

  return (
    <aside className="flex h-screen w-[260px] shrink-0 flex-col bg-white shadow-sm">
      <div className="flex items-center justify-between bg-[#3A0099] px-5 py-4">
        <span className="text-lg font-bold text-white">NurtureWave</span>
        <button
          type="button"
          className="text-white transition hover:opacity-80"
          aria-label="Toggle menu"
        >
          <HiMenu className="h-6 w-6" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="flex flex-col gap-1">
          {navItems.slice(0, 1).map(({ label, path, icon: Icon }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "border border-gray-200 bg-gray-100 text-[#3A0099]"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}

          <li>
            <button
              type="button"
              onClick={() => setAccountsOpen((prev) => !prev)}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <HiOutlineUserGroup className="h-5 w-5 shrink-0" />
              <span className="flex-1 text-left">Accounts</span>
              <HiChevronDown
                className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${
                  accountsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {accountsOpen && (
              <ul className="mt-1 flex flex-col gap-1 pl-11">
                <li>
                  <NavLink
                    to="/account"
                    className={({ isActive }) =>
                      `block rounded-lg px-3 py-2 text-sm transition ${
                        isActive
                          ? "font-medium text-[#3A0099]"
                          : "text-gray-600 hover:bg-gray-100"
                      }`
                    }
                  >
                    Account
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {navItems.slice(1).map(({ label, path, icon: Icon }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "border border-gray-200 bg-gray-100 text-[#6366F1]"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div ref={menuRef} className="relative bg-[#EDE9F7] px-4 py-3">
        {userMenuOpen && (
          <div className="absolute bottom-full right-3 mb-2 min-w-[140px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full px-4 py-2.5 text-left text-sm font-medium text-gray-700 transition hover:bg-red-500 hover:text-white  flex items-center gap-2"
            >
              <HiLogout className="h-5 w-5 shrink-0" /> LogOut
            </button>
          </div>
        )}

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-400 text-sm font-semibold text-white">
            {avatarLetter}
          </div>
          <span className="flex-1 truncate text-sm font-semibold text-gray-800">
            {displayName}
          </span>
          <button
            type="button"
            onClick={() => setUserMenuOpen((prev) => !prev)}
            className="rounded p-1 text-gray-600 transition hover:bg-white/60"
            aria-label="User menu"
          >
            <HiDotsHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;

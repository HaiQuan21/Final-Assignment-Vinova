import type { Admin } from "../constants/MainObjectClass";

export function getCurrentUser(): Admin | null {
  try {
    const raw = localStorage.getItem("currentUser");
    return raw ? (JSON.parse(raw) as Admin) : null;
  } catch {
    return null;
  }
}

export function isSuperAdmin(): boolean {
  return getCurrentUser()?.role === "superAdmin";
}
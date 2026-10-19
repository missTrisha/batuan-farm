// src/components/layout/navItems.ts
import type { IconType } from "react-icons";
import {
  FiGrid,
  FiUsers,
  FiClipboard,
  FiTruck,
  FiPackage,
  FiBarChart2,
  FiBell,
  FiSettings,
} from "react-icons/fi";

export type Role = "mao" | "agriculture_worker";

export type NavItem = {
  to: string;
  label: string;
  icon: IconType;
  end?: boolean;
  adminOnly?: boolean; // hidden from agriculture workers
};

export const navItems: NavItem[] = [
  { to: "/", label: "Dashboard", icon: FiGrid, end: true },
  { to: "/farmers", label: "Farmers", icon: FiUsers },
  { to: "/qualification", label: "Qualification", icon: FiClipboard },
  { to: "/distribution", label: "Distribution", icon: FiTruck },
  { to: "/inventory", label: "Inventory", icon: FiPackage },
  { to: "/reports", label: "Reports", icon: FiBarChart2 },
  { to: "/notifications", label: "Notifications", icon: FiBell },
  { to: "/settings", label: "Settings", icon: FiSettings, adminOnly: true },
];

// Menu items the given role is allowed to see
export function getVisibleNavItems(role: Role): NavItem[] {
  return navItems.filter((item) => !item.adminOnly || role === "mao");
}

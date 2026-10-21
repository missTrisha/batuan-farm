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

export type NavChild = {
  to: string;
  label: string;
};

export type NavItem = {
  to: string;
  label: string;
  icon: IconType;
  end?: boolean;
  adminOnly?: boolean; // hidden from agriculture workers
  children?: NavChild[]; // makes this item an expandable group
};

export const navItems: NavItem[] = [
  { to: "/", label: "Dashboard", icon: FiGrid, end: true },
  { to: "/farmers", label: "Farmers", icon: FiUsers },
  { to: "/qualification", label: "Qualification", icon: FiClipboard },
  { to: "/distribution", label: "Distribution", icon: FiTruck },
  { to: "/inventory", label: "Inventory", icon: FiPackage },
  { to: "/reports", label: "Reports", icon: FiBarChart2 },
  { to: "/notifications", label: "Notifications", icon: FiBell },
  {
    to: "/settings",
    label: "Settings",
    icon: FiSettings,
    adminOnly: true,
    children: [
      { to: "/settings/users", label: "User Management" },
      { to: "/settings/audit-logs", label: "Audit Logs" },
    ],
  },
];

// Menu items the given role is allowed to see
export function getVisibleNavItems(role: Role): NavItem[] {
  return navItems.filter((item) => !item.adminOnly || role === "mao");
}

// src/components/layout/SidebarSubLink.tsx
import { NavLink } from "react-router-dom";
import type { NavChild } from "./navItems";

type SidebarSubLinkProps = {
  child: NavChild;
  onNavigate?: () => void; // closes the hamburger menu on small screens
};

export default function SidebarSubLink({
  child,
  onNavigate,
}: SidebarSubLinkProps) {
  return (
    <NavLink
      to={child.to}
      onClick={onNavigate}
      className={({ isActive }) =>
        `flex h-9 items-center rounded-lg pl-11 pr-4 text-sm font-semibold transition ${
          isActive
            ? "bg-white/15 text-white"
            : "text-white/70 hover:bg-white/10 hover:text-white"
        }`
      }
    >
      <span className="truncate">{child.label}</span>
    </NavLink>
  );
}

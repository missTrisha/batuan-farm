// src/components/layout/SidebarLink.tsx
import { NavLink } from "react-router-dom";
import type { NavItem } from "./navItems";

type SidebarLinkProps = {
  item: NavItem;
  collapsed: boolean;
  onNavigate?: () => void; // closes the hamburger menu on small screens
};

export default function SidebarLink({
  item,
  collapsed,
  onNavigate,
}: SidebarLinkProps) {
  const { to, label, icon: Icon, end } = item;

  return (
    <NavLink
      to={to}
      end={end}
      onClick={onNavigate}
      aria-label={collapsed ? label : undefined}
      className={({ isActive }) =>
        `group relative flex h-11 items-center rounded-xl text-sm font-semibold transition ${
          collapsed ? "justify-center" : "gap-3 px-4"
        } ${
          isActive
            ? "bg-primary text-on-primary shadow-sm"
            : "text-white/80 hover:bg-white/10 hover:text-white"
        }`
      }
    >
      <Icon className="shrink-0 text-lg" />

      {!collapsed && <span className="truncate">{label}</span>}

      {/* Label bubble, only when the sidebar is icons-only */}
      {collapsed && (
        <span
          role="tooltip"
          className="pointer-events-none absolute left-full z-50 ml-3 whitespace-nowrap rounded-lg bg-forest-950 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-card transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          {label}
        </span>
      )}
    </NavLink>
  );
}

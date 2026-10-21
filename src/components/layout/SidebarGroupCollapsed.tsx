// src/components/layout/SidebarGroupCollapsed.tsx
import { Link, useLocation } from "react-router-dom";
import type { NavItem } from "./navItems";
import SidebarFlyout from "./SidebarFlyout";

type SidebarGroupCollapsedProps = {
  item: NavItem;
  onNavigate?: () => void; // closes the hamburger menu on small screens
};

export default function SidebarGroupCollapsed({
  item,
  onNavigate,
}: SidebarGroupCollapsedProps) {
  const { to, label, icon: Icon, children = [] } = item;
  const { pathname } = useLocation();

  // Active when the current page is inside this group
  const isActive = pathname === to || pathname.startsWith(`${to}/`);

  return (
    <div className="group relative">
      {/* Clicking the icon opens the group's first page */}
      <Link
        to={children[0]?.to ?? to}
        onClick={onNavigate}
        aria-label={label}
        className={`flex h-11 items-center justify-center rounded-xl text-sm font-semibold transition ${
          isActive
            ? "bg-primary text-on-primary shadow-sm"
            : "text-white/80 hover:bg-white/10 hover:text-white"
        }`}
      >
        <Icon className="shrink-0 text-lg" />
      </Link>

      <SidebarFlyout label={label} onNavigate={onNavigate}>
        {children}
      </SidebarFlyout>
    </div>
  );
}

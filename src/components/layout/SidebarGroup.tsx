// src/components/layout/SidebarGroup.tsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import type { NavItem } from "./navItems";
import SidebarGroupCollapsed from "./SidebarGroupCollapsed";
import SidebarSubLink from "./SidebarSubLink";

type SidebarGroupProps = {
  item: NavItem;
  collapsed: boolean;
  onNavigate?: () => void; // closes the hamburger menu on small screens
};

export default function SidebarGroup({
  item,
  collapsed,
  onNavigate,
}: SidebarGroupProps) {
  const { to, label, icon: Icon, children = [] } = item;
  const { pathname } = useLocation();

  // This group is "active" when the current page is inside it
  const isActive = pathname === to || pathname.startsWith(`${to}/`);
  const [open, setOpen] = useState(isActive);

  // Open automatically when the user lands on one of its pages
  useEffect(() => {
    if (isActive) setOpen(true);
  }, [isActive]);

  // Icons-only mode: icon button with a hover flyout
  if (collapsed) {
    return <SidebarGroupCollapsed item={item} onNavigate={onNavigate} />;
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className={`flex h-11 items-center gap-3 rounded-xl px-4 text-sm font-semibold transition ${
          isActive
            ? "bg-primary text-on-primary shadow-sm"
            : "text-white/80 hover:bg-white/10 hover:text-white"
        }`}
      >
        <Icon className="shrink-0 text-lg" />
        <span className="flex-1 truncate text-left">{label}</span>
        <FiChevronDown
          className={`shrink-0 text-base transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="flex flex-col gap-1">
          {children.map((child) => (
            <SidebarSubLink
              key={child.to}
              child={child}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

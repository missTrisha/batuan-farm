// src/components/layout/SidebarFlyout.tsx
import { NavLink } from "react-router-dom";
import type { NavChild } from "./navItems";

type SidebarFlyoutProps = {
  label: string; // the group's name, shown as the panel heading
  children: NavChild[];
  onNavigate?: () => void;
};

export default function SidebarFlyout({
  label,
  children,
  onNavigate,
}: SidebarFlyoutProps) {
  return (
    // pl-3 is an invisible bridge, so the panel doesn't close while the
    // mouse moves from the icon to the panel
    <div className="absolute left-full top-0 z-50 hidden pl-3 group-hover:block group-focus-within:block">
      <div className="min-w-48 rounded-xl bg-forest-950 p-2 shadow-card">
        <p className="px-3 pb-1 pt-1.5 text-xs font-bold uppercase tracking-wide text-white/60">
          {label}
        </p>

        {children.map((child) => (
          <NavLink
            key={child.to}
            to={child.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex h-9 items-center whitespace-nowrap rounded-lg px-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-white/15 text-white"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            {child.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

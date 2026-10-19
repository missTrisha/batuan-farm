// src/components/layout/Sidebar.tsx
import { getVisibleNavItems } from "./navItems";
import type { Role } from "./navItems";
import SidebarBrand from "./SidebarBrand";
import SidebarLink from "./SidebarLink";
import SidebarToggle from "./SidebarToggle";

type SidebarProps = {
  role: Role;
  collapsed: boolean; // icons-only mode (desktop)
  onToggleCollapsed: () => void;
  mobileOpen: boolean; // hamburger drawer (phone and tablet)
  onCloseMobile: () => void;
};

export default function Sidebar({
  role,
  collapsed,
  onToggleCollapsed,
  mobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const items = getVisibleNavItems(role);

  return (
    <>
      {/* Dark overlay behind the drawer on small screens */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={`auth-bg fixed inset-y-0 left-0 z-40 flex w-64 flex-col text-white transition-all duration-200 lg:relative lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${collapsed ? "lg:w-20" : "lg:w-64"}`}
      >
        <SidebarToggle collapsed={collapsed} onToggle={onToggleCollapsed} />

        <SidebarBrand collapsed={collapsed} />

        <nav className="flex flex-col gap-1 px-3 pb-4">
          {items.map((item) => (
            <SidebarLink
              key={item.to}
              item={item}
              collapsed={collapsed}
              onNavigate={onCloseMobile}
            />
          ))}
        </nav>
      </aside>
    </>
  );
}

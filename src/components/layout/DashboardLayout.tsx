// src/components/layout/DashboardLayout.tsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import type { Role } from "./navItems";

const STORAGE_KEY = "sidebar-collapsed";

function readCollapsed(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

type DashboardLayoutProps = {
  displayName: string;
  email: string;
  role: Role;
  avatarPath: string | null;
};

export default function DashboardLayout({
  displayName,
  email,
  role,
  avatarPath,
}: DashboardLayoutProps) {
  const [collapsedPref, setCollapsedPref] = useState(readCollapsed);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // The drawer on small screens always shows full labels
  const collapsed = collapsedPref && isDesktop;

  function toggleCollapsed() {
    const next = !collapsedPref;
    setCollapsedPref(next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
    } catch {
      // storage unavailable, the choice just won't be remembered
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-page text-ink">
      <Sidebar
        role={role}
        collapsed={collapsed}
        onToggleCollapsed={toggleCollapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          displayName={displayName}
          email={email}
          role={role}
          avatarPath={avatarPath}
          onOpenMenu={() => setMobileOpen(true)}
        />

        {/* The only part of the screen that scrolls */}
        {/* <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main> */}
        <main className="flex-1 overflow-y-auto bg-green-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

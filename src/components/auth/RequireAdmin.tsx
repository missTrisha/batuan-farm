// src/components/auth/RequireAdmin.tsx
import { Navigate, Outlet } from "react-router-dom";
import type { Role } from "../layout/navItems";

export default function RequireAdmin({ role }: { role: Role }) {
  return role === "mao" ? <Outlet /> : <Navigate to="/" replace />;
}

// src/App.tsx
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuthProfile } from "./hooks/useAuthProfile";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import RequireAdmin from "./components/auth/RequireAdmin";
import NoAccess from "./components/auth/NoAccess";
import FullScreenLoader from "./components/ui/FullScreenLoader";
import DashboardPage from "./pages/DashboardPage";
import FarmersPage from "./pages/FarmersPage";
import QualificationPage from "./pages/QualificationPage";
import DistributionPage from "./pages/DistributionPage";
import InventoryPage from "./pages/InventoryPage";
import ReportsPage from "./pages/ReportsPage";
import NotificationsPage from "./pages/NotificationsPage";
import SettingsPage from "./pages/SettingsPage";
import AccountPage from "./pages/AccountPage";

export default function App() {
  const {
    checking,
    session,
    profile,
    profileFailed,
    loadingProfile,
    patchProfile,
  } = useAuthProfile();

  if (checking) return <FullScreenLoader />;
  if (!session) return <LoginPage />;
  if (profileFailed) return <NoAccess />;
  if (loadingProfile || !profile) return <FullScreenLoader />;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <DashboardLayout
              displayName={profile.display_name}
              email={profile.email}
              role={profile.role}
              avatarPath={profile.avatar_path}
            />
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="farmers" element={<FarmersPage />} />
          <Route path="qualification" element={<QualificationPage />} />
          <Route path="distribution" element={<DistributionPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route
            path="account"
            element={
              <AccountPage profile={profile} onProfileChange={patchProfile} />
            }
          />

          {/* Admin-only pages */}
          <Route element={<RequireAdmin role={profile.role} />}>
            <Route
              path="settings"
              element={<SettingsPage currentUserId={profile.id} />}
            />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

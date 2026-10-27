// src/components/layout/Topbar.tsx
import { FiMenu } from "react-icons/fi";
import NotificationBell from "./NotificationBell";
import ProfileMenu from "./ProfileMenu";
import type { Role } from "./navItems";

type TopbarProps = {
  displayName: string;
  email: string;
  role: Role;
  avatarPath: string | null;
  onOpenMenu: () => void; // opens the sidebar drawer on small screens
};

export default function Topbar({
  displayName,
  email,
  role,
  avatarPath,
  onOpenMenu,
}: TopbarProps) {
  return (
    <header className="flex h-20 shrink-0 items-center justify-between gap-4 border-b border-line bg-surface px-4 sm:px-6">
      {/* Left: hamburger (small screens) + municipality name */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Open menu"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-ink transition hover:bg-primary/10 lg:hidden"
        >
          <FiMenu className="text-2xl" />
        </button>

        {/* <div className="flex min-w-0 flex-col leading-tight">
          <span className="truncate text-sm font-bold text-ink sm:text-base">
            Municipality of Batuan, Masbate
          </span>
          <span className="hidden truncate text-xs text-muted sm:block">
            Supporting Our Farmers, Growing Our Future
          </span>
        </div> */}
        {/* Municipality name: hidden on phones, shown from sm and up */}
        <div className="hidden min-w-0 flex-col leading-tight sm:flex">
          <span className="truncate text-sm font-bold text-ink sm:text-base">
            Municipality of Batuan, Masbate
          </span>
          <span className="hidden truncate text-xs text-muted sm:block">
            Supporting Our Farmers, Growing Our Future
          </span>
        </div>
      </div>

      {/* Right: notifications + profile */}
      <div className="flex shrink-0 items-center gap-2">
        <div className="hidden sm:block">
          <NotificationBell />
        </div>
        <div className="hidden h-8 w-px bg-line sm:block" />
        <ProfileMenu
          displayName={displayName}
          email={email}
          role={role}
          avatarPath={avatarPath}
        />
      </div>
    </header>
  );
}

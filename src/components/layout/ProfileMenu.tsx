// src/components/layout/ProfileMenu.tsx
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown, FiLogOut, FiUser } from "react-icons/fi";
import { supabase } from "../../lib/supabase";
import { useAvatarUrl } from "../../hooks/useAvatarUrl";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";
import type { Role } from "./navItems";

const roleLabels: Record<Role, string> = {
  mao: "MAO",
  agriculture_worker: "Agriculture Worker",
};

type ProfileMenuProps = {
  displayName: string;
  email: string;
  role: Role;
  avatarPath: string | null;
};

export default function ProfileMenu({
  displayName,
  email,
  role,
  avatarPath,
}: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const avatarUrl = useAvatarUrl(avatarPath);

  // Close when clicking outside or pressing Esc
  useEffect(() => {
    if (!open) return;

    function handleClick(e: MouseEvent) {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Open profile menu"
        className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-primary/10"
      >
        {/* Phones: simple icon */}
        <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-ink sm:hidden">
          <FiUser className="text-xl" />
        </span>

        {/* sm and up: avatar */}
        <span className="hidden sm:block">
          <Avatar name={displayName} src={avatarUrl} />
        </span>

        <span className="hidden min-w-0 flex-col text-left leading-tight sm:flex">
          <span className="max-w-40 truncate text-sm font-bold text-ink">
            {displayName}
          </span>
          <span className="text-xs text-muted">{roleLabels[role]}</span>
        </span>

        <FiChevronDown
          className={`hidden text-muted transition-transform sm:block ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-line bg-surface p-2 shadow-card"
        >
          <div className="flex items-center gap-3 px-3 py-3">
            <Avatar
              name={displayName}
              src={avatarUrl}
              className="h-12 w-12 text-base"
            />
            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-bold text-ink">
                {displayName}
              </p>
              <p className="truncate text-xs text-muted">{email}</p>
              <p className="text-xs font-semibold text-primary">
                {roleLabels[role]}
              </p>
            </div>
          </div>

          <div className="my-1 border-t border-line" />

          <Link
            to="/account"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-ink transition hover:bg-primary/10"
          >
            <FiUser className="text-lg" />
            My Account
          </Link>

          <Button
            variant="danger"
            className="h-11 w-full"
            onClick={() => supabase.auth.signOut()}
          >
            <FiLogOut className="text-lg" />
            Sign Out
          </Button>
        </div>
      )}
    </div>
  );
}

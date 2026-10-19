// src/components/settings/UserRow.tsx
import type { ReactNode } from "react";
import type { Profile } from "../../hooks/useAuthProfile";
import { useAvatarUrl } from "../../hooks/useAvatarUrl";
import Avatar from "../ui/Avatar";
import type { Role } from "../layout/navItems";

const roleLabels: Record<Role, string> = {
  mao: "MAO",
  agriculture_worker: "Agriculture Worker",
};

type UserRowProps = {
  user: Profile;
  isSelf: boolean;
  actions?: ReactNode; // promote/demote and activate/deactivate buttons go here
};

export default function UserRow({ user, isSelf, actions }: UserRowProps) {
  const avatarUrl = useAvatarUrl(user.avatar_path);

  return (
    <li className="flex flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3">
      <Avatar name={user.display_name} src={avatarUrl} />

      <div className="min-w-0 flex-1 basis-48 leading-tight">
        <p className="truncate text-sm font-bold text-ink">
          {user.display_name}
          {isSelf && (
            <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
              You
            </span>
          )}
        </p>
        <p className="truncate text-xs text-muted">{user.email}</p>
      </div>

      <div className="flex items-center gap-2">
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
          {roleLabels[user.role]}
        </span>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            user.is_active
              ? "bg-primary/10 text-primary"
              : "bg-danger-bg text-danger"
          }`}
        >
          {user.is_active ? "Active" : "Inactive"}
        </span>
      </div>

      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </li>
  );
}

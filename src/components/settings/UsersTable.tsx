// src/components/settings/UsersTable.tsx
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { supabase } from "../../lib/supabase";
import type { Profile } from "../../hooks/useAuthProfile";
import Spinner from "../ui/Spinner";
import UserRow from "./UserRow";

type UsersTableProps = {
  currentUserId: string;
  refreshKey: number; // change this number to reload the list
  renderActions?: (user: Profile) => ReactNode;
};

export default function UsersTable({
  currentUserId,
  refreshKey,
  renderActions,
}: UsersTableProps) {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    supabase
      .from("profiles")
      .select("id, email, display_name, role, is_active, avatar_path")
      .order("display_name", { ascending: true })
      .then(({ data, error: fetchError }) => {
        if (cancelled) return;
        if (fetchError) {
          setError("Could not load users. Please try again.");
        } else {
          setError(null);
          setUsers((data ?? []) as Profile[]);
        }
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  if (loading && users.length === 0) {
    return (
      <div className="flex items-center gap-3 py-6 text-sm text-muted">
        <Spinner className="h-5 w-5 text-primary" />
        Loading users...
      </div>
    );
  }

  if (error) {
    return <p className="py-4 text-sm text-danger">{error}</p>;
  }

  if (users.length === 0) {
    return <p className="py-4 text-sm text-muted">No users yet.</p>;
  }

  return (
    <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line">
      {users.map((user) => (
        <UserRow
          key={user.id}
          user={user}
          isSelf={user.id === currentUserId}
          actions={renderActions?.(user)}
        />
      ))}
    </ul>
  );
}

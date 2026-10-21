// src/components/settings/UserActions.tsx
import { useState } from "react";
import RoleButton from "./RoleButton";
import ActiveButton from "./ActiveButton";
import type { Profile } from "../../hooks/useAuthProfile";

type UserActionsProps = {
  user: Profile;
  onChanged: () => void; // lets the page reload the users list
};

export default function UserActions({ user, onChanged }: UserActionsProps) {
  const [error, setError] = useState<string | null>(null);

  function handleDone(message: string | null) {
    setError(message);
    if (!message) onChanged();
  }

  return (
    <>
      <RoleButton user={user} onDone={handleDone} />
      <ActiveButton user={user} onDone={handleDone} />
      {error && <p className="basis-full text-xs text-danger">{error}</p>}
    </>
  );
}

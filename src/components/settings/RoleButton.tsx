// src/components/settings/RoleButton.tsx
import { useState } from "react";
import Button from "../ui/Button";
import { updateUser } from "../../lib/updateUser";
import type { Profile } from "../../hooks/useAuthProfile";

type RoleButtonProps = {
  user: Profile;
  onDone: (error: string | null) => void; // error message, or null when saved
};

export default function RoleButton({ user, onDone }: RoleButtonProps) {
  const [saving, setSaving] = useState(false);
  const isMao = user.role === "mao";

  async function handleClick() {
    setSaving(true);
    const error = await updateUser(user.id, {
      role: isMao ? "agriculture_worker" : "mao",
    });
    setSaving(false);
    onDone(error);
  }

  return (
    <Button
      type="button"
      className="px-3 py-1.5 text-xs"
      loading={saving}
      loadingText="Saving..."
      onClick={handleClick}
    >
      {isMao ? "Demote" : "Promote"}
    </Button>
  );
}

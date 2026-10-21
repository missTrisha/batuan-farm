// src/components/settings/ActiveButton.tsx
import { useState } from "react";
import Button from "../ui/Button";
import { updateUser } from "../../lib/updateUser";
import type { Profile } from "../../hooks/useAuthProfile";

type ActiveButtonProps = {
  user: Profile;
  onDone: (error: string | null) => void; // error message, or null when saved
};

export default function ActiveButton({ user, onDone }: ActiveButtonProps) {
  const [saving, setSaving] = useState(false);

  async function handleClick() {
    setSaving(true);
    const error = await updateUser(user.id, { is_active: !user.is_active });
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
      {user.is_active ? "Deactivate" : "Activate"}
    </Button>
  );
}

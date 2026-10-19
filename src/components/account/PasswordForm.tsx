// src/components/account/PasswordForm.tsx
import { useState } from "react";
import type { FormEvent } from "react";
import { supabase } from "../../lib/supabase";
import TextField from "../ui/TextField";
import Button from "../ui/Button";

const MIN_LENGTH = 8;

type PasswordFormProps = {
  email: string;
};

export default function PasswordForm({ email }: PasswordFormProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaved(false);

    if (!currentPassword) {
      setError("Enter your current password.");
      return;
    }
    if (newPassword.length < MIN_LENGTH) {
      setError(`New password must be at least ${MIN_LENGTH} characters.`);
      return;
    }
    if (newPassword === currentPassword) {
      setError("New password must be different from the current one.");
      return;
    }

    setError(null);
    setSaving(true);

    // Confirm the current password first by signing in with it
    const { error: verifyError } = await supabase.auth.signInWithPassword({
      email,
      password: currentPassword,
    });

    if (verifyError) {
      setSaving(false);
      setError("Current password is incorrect.");
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    setSaving(false);

    if (updateError) {
      setError(updateError.message || "Could not change your password.");
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setSaved(true);
  }

  function clearStatus() {
    setSaved(false);
    setError(null);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextField
        label="Current password"
        type="password"
        revealable
        value={currentPassword}
        onChange={(e) => {
          setCurrentPassword(e.target.value);
          clearStatus();
        }}
        autoComplete="current-password"
        disabled={saving}
      />

      <TextField
        label="New password"
        type="password"
        revealable
        value={newPassword}
        onChange={(e) => {
          setNewPassword(e.target.value);
          clearStatus();
        }}
        autoComplete="new-password"
        hint={`At least ${MIN_LENGTH} characters.`}
        error={error}
        disabled={saving}
      />

      <div className="flex items-center gap-3">
        <Button
          type="submit"
          className="px-5 py-2.5 text-sm"
          loading={saving}
          loadingText="Updating..."
          disabled={!currentPassword || !newPassword}
        >
          Change password
        </Button>
        {saved && (
          <span className="text-sm font-semibold text-primary">
            Password updated
          </span>
        )}
      </div>
    </form>
  );
}

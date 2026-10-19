// src/components/settings/CreateUserForm.tsx
import { useState } from "react";
import type { FormEvent } from "react";
import { FunctionsHttpError } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";
import TextField from "../ui/TextField";
import Button from "../ui/Button";
import type { Role } from "../layout/navItems";

const MIN_PASSWORD = 8;

const roleOptions: { value: Role; label: string }[] = [
  { value: "agriculture_worker", label: "Agriculture Worker" },
  { value: "mao", label: "MAO" },
];

type CreateUserFormProps = {
  onCreated: () => void; // lets the parent refresh the users list
};

export default function CreateUserForm({ onCreated }: CreateUserFormProps) {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("agriculture_worker");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdEmail, setCreatedEmail] = useState<string | null>(null);

  function clearStatus() {
    setError(null);
    setCreatedEmail(null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    clearStatus();

    if (!displayName.trim()) {
      setError("Enter a display name.");
      return;
    }
    if (!email.trim()) {
      setError("Enter an email address.");
      return;
    }
    if (password.length < MIN_PASSWORD) {
      setError(`Password must be at least ${MIN_PASSWORD} characters.`);
      return;
    }

    setSaving(true);

    const { error: invokeError } = await supabase.functions.invoke(
      "create-user",
      {
        body: {
          display_name: displayName.trim(),
          email: email.trim(),
          password,
          role,
        },
      },
    );

    setSaving(false);

    if (invokeError) {
      let message = "Could not create the account.";
      if (invokeError instanceof FunctionsHttpError) {
        try {
          const body = await invokeError.context.json();
          if (body?.error) message = body.error;
        } catch {
          // keep the generic message
        }
      }
      setError(message);
      return;
    }

    setCreatedEmail(email.trim().toLowerCase());
    setDisplayName("");
    setEmail("");
    setPassword("");
    setRole("agriculture_worker");
    onCreated();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextField
        label="Display name"
        value={displayName}
        onChange={(e) => {
          setDisplayName(e.target.value);
          clearStatus();
        }}
        maxLength={60}
        autoComplete="off"
        disabled={saving}
      />

      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          clearStatus();
        }}
        autoComplete="off"
        disabled={saving}
      />

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="new-user-role"
          className="text-sm font-semibold text-ink"
        >
          Role
        </label>
        <select
          id="new-user-role"
          value={role}
          onChange={(e) => {
            setRole(e.target.value as Role);
            clearStatus();
          }}
          disabled={saving}
          className="h-11 w-full rounded-xl border border-line bg-surface px-3 text-sm text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {roleOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <TextField
        label="Temporary password"
        type="password"
        revealable
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          clearStatus();
        }}
        autoComplete="new-password"
        hint="Share this with the user. They can change it later in My Account."
        error={error}
        disabled={saving}
      />

      <div className="flex items-center gap-3">
        <Button
          type="submit"
          className="px-5 py-2.5 text-sm"
          loading={saving}
          loadingText="Creating..."
        >
          Create account
        </Button>
        {createdEmail && (
          <span className="text-sm font-semibold text-primary">
            Account created for {createdEmail}
          </span>
        )}
      </div>
    </form>
  );
}

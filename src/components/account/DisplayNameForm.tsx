// src/components/account/DisplayNameForm.tsx
import { useState } from "react";
import type { FormEvent } from "react";
import { supabase } from "../../lib/supabase";
import TextField from "../ui/TextField";
import Button from "../ui/Button";

const MAX_LENGTH = 60;

type DisplayNameFormProps = {
  userId: string;
  currentName: string;
  onSaved: (newName: string) => void;
};

export default function DisplayNameForm({
  userId,
  currentName,
  onSaved,
}: DisplayNameFormProps) {
  const [name, setName] = useState(currentName);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const trimmed = name.trim();
  const unchanged = trimmed === currentName;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaved(false);

    if (!trimmed) {
      setError("Display name cannot be empty.");
      return;
    }
    if (trimmed.length > MAX_LENGTH) {
      setError(`Display name must be ${MAX_LENGTH} characters or fewer.`);
      return;
    }

    setError(null);
    setSaving(true);

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ display_name: trimmed })
      .eq("id", userId);

    setSaving(false);

    if (updateError) {
      setError("Could not save your name. Please try again.");
      return;
    }

    setName(trimmed);
    setSaved(true);
    onSaved(trimmed);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextField
        label="Display name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setSaved(false);
        }}
        maxLength={MAX_LENGTH}
        autoComplete="name"
        error={error}
        hint="This is the name shown in the topbar and in records."
        disabled={saving}
      />

      <div className="flex items-center gap-3">
        <Button
          type="submit"
          className="px-5 py-2.5 text-sm"
          loading={saving}
          loadingText="Saving..."
          disabled={unchanged}
        >
          Save name
        </Button>
        {saved && (
          <span className="text-sm font-semibold text-primary">Saved</span>
        )}
      </div>
    </form>
  );
}

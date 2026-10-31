// src/components/farmers/EditableSection.tsx
import { useState, type ReactNode } from "react";
import { FiEdit2 } from "react-icons/fi";

interface EditableSectionProps {
  title: string;
  canEdit: boolean;
  renderView: () => ReactNode;
  renderForm: () => ReactNode;
  // Saves the section's draft. Throw an Error with a readable message to fail.
  onSave: () => Promise<void>;
  // Lets the section throw away its draft when the user cancels.
  onCancel?: () => void;
}

export default function EditableSection({
  title,
  canEdit,
  renderView,
  renderForm,
  onSave,
  onCancel,
}: EditableSectionProps) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleCancel() {
    onCancel?.();
    setError(null);
    setEditing(false);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await onSave();
      setEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save changes.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="rounded-xl border border-green-200 bg-green-100 p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-gray-900">{title}</h2>

        {canEdit && !editing && (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-green-300 px-3 py-1.5 text-sm font-medium text-green-800 transition hover:bg-green-200"
          >
            <FiEdit2 aria-hidden="true" />
            Edit
          </button>
        )}
      </div>

      {editing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderForm()}

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCancel}
              disabled={saving}
              className="rounded-lg border border-green-300 px-4 py-2 text-sm font-medium text-green-800 transition hover:bg-green-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      ) : (
        renderView()
      )}
    </section>
  );
}

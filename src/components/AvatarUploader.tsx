// src/components/AvatarUploader.tsx
import { useRef, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAvatarUrl } from "../hooks/useAvatarUrl";
import Avatar from "./ui/Avatar";
import Button from "./ui/Button";

const BUCKET = "avatars";
const MAX_BYTES = 2 * 1024 * 1024; // 2 MB, same as the bucket limit
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

type AvatarUploaderProps = {
  userId: string;
  displayName?: string | null;
  avatarPath?: string | null;
  /** Called with the new path after upload, or null after removal */
  onChange: (newPath: string | null) => void;
};

export default function AvatarUploader({
  userId,
  displayName,
  avatarPath,
  onChange,
}: AvatarUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState<"upload" | "remove" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const url = useAvatarUrl(avatarPath);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // lets the same file be picked again later
    if (!file) return;

    setError(null);

    const ext = ALLOWED_TYPES[file.type];
    if (!ext) {
      setError("Please choose a JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("Image is too large. Maximum size is 2 MB.");
      return;
    }

    setBusy("upload");
    const newPath = `${userId}/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(newPath, file, { contentType: file.type, upsert: false });

    if (uploadError) {
      setError("Upload failed. Please try again.");
      setBusy(null);
      return;
    }

    const { data, error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_path: newPath })
      .eq("id", userId)
      .select("id");

    if (updateError || !data || data.length === 0) {
      // Roll back the orphaned file
      await supabase.storage.from(BUCKET).remove([newPath]);
      setError("Could not save your picture. Please try again.");
      setBusy(null);
      return;
    }

    // Delete the previous picture (ignore failure, it is only cleanup)
    if (avatarPath) {
      await supabase.storage.from(BUCKET).remove([avatarPath]);
    }

    onChange(newPath);
    setBusy(null);
  }

  async function handleRemove() {
    if (!avatarPath) return;
    setError(null);
    setBusy("remove");

    const { data, error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_path: null })
      .eq("id", userId)
      .select("id");

    if (updateError || !data || data.length === 0) {
      setError("Could not remove your picture. Please try again.");
      setBusy(null);
      return;
    }

    await supabase.storage.from(BUCKET).remove([avatarPath]);
    onChange(null);
    setBusy(null);
  }

  return (
    <div className="flex flex-col gap-3">
      {/* <div className="flex items-center gap-4"> */}
      <div className="flex items-center gap-20">
        <Avatar
          src={url}
          name={displayName ?? ""}
          shape="square"
          className="h-28 w-28 text-3xl"
        />

        <div className="flex w-40 flex-col gap-2">
          <Button
            className="w-full px-4 py-2 text-sm"
            loading={busy === "upload"}
            loadingText="Uploading..."
            disabled={busy !== null}
            onClick={() => inputRef.current?.click()}
          >
            {avatarPath ? "Change picture" : "Upload picture"}
          </Button>

          {avatarPath && (
            <Button
              variant="danger"
              className="w-full bg-danger! text-white! px-4 py-2 text-sm hover:bg-danger/90!"
              loading={busy === "remove"}
              loadingText="Removing..."
              disabled={busy !== null}
              onClick={handleRemove}
            >
              Remove
            </Button>
          )}
        </div>
      </div>

      <p className="text-xs text-ink/60">JPG, PNG, or WebP. Max 2 MB.</p>
      {error && <p className="text-sm text-danger">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFile}
        className="hidden"
      />
    </div>
  );
}

// src/components/farmers/form/FarmerPhotoUploader.tsx
import { useEffect, useRef, useState } from "react";
import { FiUser } from "react-icons/fi";
import { validatePhoto } from "../../../lib/farmerPhoto";
import Button from "../../ui/Button";

interface Props {
  file: File | null;
  onChange: (file: File | null) => void;
  disabled?: boolean;
}

export default function FarmerPhotoUploader({
  file,
  onChange,
  disabled = false,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Build a local preview and free it when the file changes or the form closes.
  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = e.target.files?.[0];
    e.target.value = ""; // lets the same file be picked again later
    if (!picked) return;

    const problem = validatePhoto(picked);
    if (problem) {
      setError(problem);
      return;
    }

    setError(null);
    onChange(picked);
  }

  function handleRemove() {
    setError(null);
    onChange(null);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-12">
        <div className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-xl border border-green-300 bg-white text-green-700 shadow-sm">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Farmer photo preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <FiUser className="text-4xl" aria-hidden="true" />
          )}
        </div>

        <div className="flex w-40 flex-col gap-2">
          <Button
            className="w-full px-4 py-2 text-sm"
            disabled={disabled}
            onClick={() => inputRef.current?.click()}
          >
            {file ? "Change photo" : "Choose photo"}
          </Button>

          {file && (
            <Button
              variant="danger"
              className="w-full bg-danger! text-white! px-4 py-2 text-sm hover:bg-danger/90!"
              disabled={disabled}
              onClick={handleRemove}
            >
              Remove
            </Button>
          )}
        </div>
      </div>

      <p className="text-xs text-gray-600">
        Optional. JPG, PNG, or WebP. Max 2 MB.
      </p>
      {error && <p className="text-sm text-red-700">{error}</p>}

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

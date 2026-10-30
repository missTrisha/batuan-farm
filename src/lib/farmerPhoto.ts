// src/lib/farmerPhoto.ts
import { supabase } from "./supabase";

const BUCKET = "farmer-photos";
const MAX_BYTES = 2 * 1024 * 1024; // 2 MB, same as the bucket limit
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

// Returns an error message, or null when the file is fine.
export function validatePhoto(file: File): string | null {
  if (!ALLOWED_TYPES[file.type]) {
    return "Please choose a JPG, PNG, or WebP image.";
  }
  if (file.size > MAX_BYTES) {
    return "Image is too large. Maximum size is 2 MB.";
  }
  return null;
}

// Uploads the photo under the farmer's id and returns its storage path.
export async function uploadFarmerPhoto(
  farmerId: string,
  file: File,
): Promise<string> {
  const problem = validatePhoto(file);
  if (problem) throw new Error(problem);

  const ext = ALLOWED_TYPES[file.type];
  const path = `${farmerId}/${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) {
    throw new Error("Photo upload failed. Please try again.");
  }

  return path;
}

// Best-effort cleanup. Workers cannot delete, so a failure here is ignored.
export async function removeFarmerPhoto(path: string): Promise<void> {
  await supabase.storage.from(BUCKET).remove([path]);
}

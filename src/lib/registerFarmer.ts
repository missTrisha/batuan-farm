// src/lib/registerFarmer.ts
import { supabase } from "./supabase";
import type { Farmer, FarmerInput } from "../types/farmer";
import { removeFarmerPhoto, uploadFarmerPhoto } from "./farmerPhoto";

// Turns a database error into a message the staff can understand.
function friendlyMessage(code: string | undefined, fallback: string): string {
  if (code === "23505") {
    return "A farmer with this RSBSA ID already exists.";
  }
  if (code === "23503") {
    return "The selected barangay is not valid. Please choose it again.";
  }
  if (code === "42501") {
    return "You do not have permission to register farmers.";
  }
  return fallback;
}

export async function registerFarmer(
  input: FarmerInput,
  photo: File | null = null,
): Promise<Farmer> {
  // The id is made here so the photo can be stored under it before the row exists.
  const id = crypto.randomUUID();

  let photoPath: string | null = null;
  if (photo) {
    photoPath = await uploadFarmerPhoto(id, photo);
  }

  const { data, error } = await supabase
    .from("farmers")
    .insert({
      ...input,
      id,
      photo_path: photoPath,
      registration_source: "online",
      client_created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    // Do not leave the photo behind if the farmer was not saved.
    // Only the MAO can delete, so this may quietly fail for a worker.
    if (photoPath) await removeFarmerPhoto(photoPath);

    throw new Error(
      friendlyMessage(error.code, "Could not register the farmer."),
    );
  }

  return data as Farmer;
}

// // src/lib/registerFarmer.ts
// import { supabase } from "./supabase";
// import type { Farmer, FarmerInput } from "../types/farmer";

// // Turns a database error into a message the staff can understand.
// function friendlyMessage(code: string | undefined, fallback: string): string {
//   if (code === "23505") {
//     return "A farmer with this RSBSA ID already exists.";
//   }
//   if (code === "23503") {
//     return "The selected barangay is not valid. Please choose it again.";
//   }
//   if (code === "42501") {
//     return "You do not have permission to register farmers.";
//   }
//   return fallback;
// }

// export async function registerFarmer(input: FarmerInput): Promise<Farmer> {
//   const { data, error } = await supabase
//     .from("farmers")
//     .insert({
//       ...input,
//       registration_source: "online",
//       client_created_at: new Date().toISOString(),
//     })
//     .select()
//     .single();

//   if (error) {
//     throw new Error(
//       friendlyMessage(error.code, "Could not register the farmer."),
//     );
//   }

//   return data as Farmer;
// }

// src/lib/updateFarmer.ts
import { supabase } from "./supabase";
import type { FarmerInput } from "../types/farmer";

// Any subset of the fields the registration form is allowed to send.
export type FarmerChanges = Partial<FarmerInput>;

// Saves changes to one farmer. Throws an Error with a readable
// message if it fails, so the section can show it.
export async function updateFarmer(
  farmerId: string,
  changes: FarmerChanges,
): Promise<void> {
  const { data, error } = await supabase
    .from("farmers")
    .update(changes)
    .eq("id", farmerId)
    .is("deleted_at", null)
    .select("id");

  if (error) {
    // 23505 = unique violation, which here means a duplicate RSBSA ID.
    if (error.code === "23505") {
      throw new Error("That RSBSA ID is already used by another farmer.");
    }
    throw new Error(error.message);
  }

  // A blocked update returns no error and no rows, so confirm a row changed.
  if (!data || data.length === 0) {
    throw new Error(
      "Could not save the changes. You may not have permission, or the farmer was removed.",
    );
  }
}

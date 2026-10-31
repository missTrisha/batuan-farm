// src/lib/approveFarmer.ts
import { supabase } from "./supabase";

// Approves a pending or rejected farmer. Throws an Error with a
// readable message if it fails, so the button can show it.
export async function approveFarmer(farmerId: string): Promise<void> {
  const { data: sessionData } = await supabase.auth.getSession();
  const userId = sessionData.session?.user.id;

  if (!userId) {
    throw new Error("You are signed out. Please log in again.");
  }

  const { data, error } = await supabase
    .from("farmers")
    .update({
      status: "approved",
      approved_by: userId,
      approved_at: new Date().toISOString(),
      rejection_reason: null, // clear an old reason when re-approving
    })
    .eq("id", farmerId)
    .in("status", ["pending", "rejected"]) // never re-approve an approved one
    .select("id");

  if (error) {
    throw new Error(error.message);
  }

  // A blocked or no-match update returns no error and no rows,
  // so confirm a row actually changed before reporting success.
  if (!data || data.length === 0) {
    throw new Error(
      "Could not approve this farmer. It may already be approved, or you may not have permission.",
    );
  }
}

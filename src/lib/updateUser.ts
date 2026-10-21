// src/lib/updateUser.ts
import { supabase } from "./supabase";
import type { Role } from "../components/layout/navItems";

type UserChanges = {
  role?: Role;
  is_active?: boolean;
};

// Returns an error message, or null when the change was saved
export async function updateUser(
  id: string,
  changes: UserChanges,
): Promise<string | null> {
  const { data, error } = await supabase
    .from("profiles")
    .update(changes)
    .eq("id", id)
    .select("id");

  if (error) return "Could not save the change. Please try again.";

  // Supabase reports no error when a security rule blocks an update,
  // it just changes zero rows, so we check for that here
  if (!data || data.length === 0) {
    return "You do not have permission to change this user.";
  }

  return null;
}

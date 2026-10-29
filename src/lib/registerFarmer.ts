// src/lib/registerFarmer.ts
import { supabase } from "./supabase";
import type { Farmer, FarmerInput } from "../types/farmer";

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

export async function registerFarmer(input: FarmerInput): Promise<Farmer> {
  const { data, error } = await supabase
    .from("farmers")
    .insert({
      ...input,
      registration_source: "online",
      client_created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    throw new Error(
      friendlyMessage(error.code, "Could not register the farmer."),
    );
  }

  return data as Farmer;
}

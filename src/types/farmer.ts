// src/types/farmer.ts
export type FarmerStatus = "pending" | "approved" | "rejected" | "inactive";

export type RegistrationSource = "online" | "offline";

// One row of the `farmers` table, exactly as the database returns it.
export interface Farmer {
  id: string;
  farmer_number: number | null;
  rsbsa_id: string | null;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  suffix: string | null;
  birthdate: string | null; // 'YYYY-MM-DD'
  gender: string | null;
  civil_status: string | null;
  contact_number: string | null;
  barangay_id: string;
  purok_sitio: string | null;
  is_4ps_beneficiary: boolean;
  is_pwd: boolean;
  is_indigenous: boolean;
  indigenous_group: string | null;
  photo_path: string | null;
  status: FarmerStatus;
  approved_by: string | null;
  approved_at: string | null;
  rejection_reason: string | null;
  registered_by: string;
  registration_source: RegistrationSource;
  device_id: string | null;
  client_created_at: string | null;
  synced_at: string | null;
  remarks: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

// What the registration form is allowed to send.
// The server or the app fills in the rest (farmer_number, status,
// approval fields, registered_by, timestamps).
export type FarmerInput = Pick<
  Farmer,
  | "rsbsa_id"
  | "first_name"
  | "middle_name"
  | "last_name"
  | "suffix"
  | "birthdate"
  | "gender"
  | "civil_status"
  | "contact_number"
  | "barangay_id"
  | "purok_sitio"
  | "is_4ps_beneficiary"
  | "is_pwd"
  | "is_indigenous"
  | "indigenous_group"
  | "photo_path"
  | "remarks"
>;

// src/types/farmerForm.ts
import type { FarmerInput } from "./farmer";

// What the register form holds while the user is typing.
// Text fields stay as strings; empty ones become null on submit.
export interface FarmerFormValues {
  rsbsa_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  suffix: string;
  birthdate: string; // 'YYYY-MM-DD' or ''
  gender: string;
  civil_status: string;
  contact_number: string;
  barangay_id: string;
  purok_sitio: string;
  is_4ps_beneficiary: boolean;
  is_pwd: boolean;
  is_indigenous: boolean;
  indigenous_group: string;
  photo_path: string | null;
  remarks: string;
}

export const EMPTY_FARMER_FORM: FarmerFormValues = {
  rsbsa_id: "",
  first_name: "",
  middle_name: "",
  last_name: "",
  suffix: "",
  birthdate: "",
  gender: "",
  civil_status: "",
  contact_number: "",
  barangay_id: "",
  purok_sitio: "",
  is_4ps_beneficiary: false,
  is_pwd: false,
  is_indigenous: false,
  indigenous_group: "",
  photo_path: null,
  remarks: "",
};

// Field name -> error message. Only fields with a problem are present.
export type FarmerFormErrors = Partial<Record<keyof FarmerFormValues, string>>;

function clean(value: string): string | null {
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

// Turns the form values into what the farmers table accepts.
export function toFarmerInput(values: FarmerFormValues): FarmerInput {
  return {
    rsbsa_id: clean(values.rsbsa_id),
    first_name: values.first_name.trim(),
    middle_name: clean(values.middle_name),
    last_name: values.last_name.trim(),
    suffix: clean(values.suffix),
    birthdate: clean(values.birthdate),
    gender: clean(values.gender),
    civil_status: clean(values.civil_status),
    contact_number: clean(values.contact_number),
    barangay_id: values.barangay_id,
    purok_sitio: clean(values.purok_sitio),
    is_4ps_beneficiary: values.is_4ps_beneficiary,
    is_pwd: values.is_pwd,
    is_indigenous: values.is_indigenous,
    indigenous_group: values.is_indigenous
      ? clean(values.indigenous_group)
      : null,
    photo_path: values.photo_path,
    remarks: clean(values.remarks),
  };
}

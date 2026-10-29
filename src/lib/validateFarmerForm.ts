// src/lib/validateFarmerForm.ts
import type { FarmerFormErrors, FarmerFormValues } from "../types/farmerForm";

// Philippine mobile number: 09XXXXXXXXX or +639XXXXXXXXX
const PH_MOBILE = /^(09|\+639)\d{9}$/;

export function validateFarmerForm(values: FarmerFormValues): FarmerFormErrors {
  const errors: FarmerFormErrors = {};

  if (!values.first_name.trim()) {
    errors.first_name = "First name is required.";
  }

  if (!values.last_name.trim()) {
    errors.last_name = "Last name is required.";
  }

  if (!values.barangay_id) {
    errors.barangay_id = "Please choose a barangay.";
  }

  if (values.rsbsa_id.trim().length > 50) {
    errors.rsbsa_id = "RSBSA ID must be 50 characters or fewer.";
  }

  if (values.birthdate) {
    const today = new Date().toISOString().slice(0, 10);
    if (values.birthdate > today) {
      errors.birthdate = "Birthdate cannot be in the future.";
    }
  }

  const contact = values.contact_number.replace(/[\s-]/g, "");
  if (contact && !PH_MOBILE.test(contact)) {
    errors.contact_number = "Use a mobile number like 09123456789.";
  }

  if (values.is_indigenous && !values.indigenous_group.trim()) {
    errors.indigenous_group = "Please specify the indigenous group.";
  }

  return errors;
}

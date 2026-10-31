// src/components/farmers/form/PersonalInfoSection.tsx
import type {
  FarmerFormErrors,
  FarmerFormValues,
} from "../../../types/farmerForm";
import FormField from "./FormField";
import { inputClass } from "./fieldStyles";

// Values must match the database check constraints (lowercase).
export const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];
export const CIVIL_STATUS_OPTIONS = [
  { value: "single", label: "Single" },
  { value: "married", label: "Married" },
  { value: "widowed", label: "Widowed" },
  { value: "separated", label: "Separated" },
];

interface Props {
  values: FarmerFormValues;
  errors: FarmerFormErrors;
  onChange: <K extends keyof FarmerFormValues>(
    field: K,
    value: FarmerFormValues[K],
  ) => void;
}

export default function PersonalInfoSection({
  values,
  errors,
  onChange,
}: Props) {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <section className="rounded-xl border border-green-200 bg-green-100 p-5 shadow-sm sm:p-6">
      <h2 className="text-base font-bold text-gray-900">
        Personal information
      </h2>
      <p className="mt-1 text-sm text-gray-600">
        Fields marked with * are required.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-4">
          <FormField
            label="RSBSA ID"
            htmlFor="rsbsa_id"
            hint="Only if the farmer already has one from the logbook."
            error={errors.rsbsa_id}
          >
            <input
              id="rsbsa_id"
              type="text"
              value={values.rsbsa_id}
              onChange={(e) => onChange("rsbsa_id", e.target.value)}
              maxLength={50}
              className={inputClass(!!errors.rsbsa_id)}
            />
          </FormField>
        </div>

        <FormField
          label="First name"
          htmlFor="first_name"
          required
          error={errors.first_name}
        >
          <input
            id="first_name"
            type="text"
            value={values.first_name}
            onChange={(e) => onChange("first_name", e.target.value)}
            className={inputClass(!!errors.first_name)}
          />
        </FormField>

        <FormField
          label="Middle name"
          htmlFor="middle_name"
          error={errors.middle_name}
        >
          <input
            id="middle_name"
            type="text"
            value={values.middle_name}
            onChange={(e) => onChange("middle_name", e.target.value)}
            className={inputClass(!!errors.middle_name)}
          />
        </FormField>

        <FormField
          label="Last name"
          htmlFor="last_name"
          required
          error={errors.last_name}
        >
          <input
            id="last_name"
            type="text"
            value={values.last_name}
            onChange={(e) => onChange("last_name", e.target.value)}
            className={inputClass(!!errors.last_name)}
          />
        </FormField>

        <FormField label="Suffix" htmlFor="suffix" error={errors.suffix}>
          <input
            id="suffix"
            type="text"
            value={values.suffix}
            onChange={(e) => onChange("suffix", e.target.value)}
            placeholder="Jr., Sr., III"
            className={inputClass(!!errors.suffix)}
          />
        </FormField>

        <FormField
          label="Birthdate"
          htmlFor="birthdate"
          error={errors.birthdate}
        >
          <input
            id="birthdate"
            type="date"
            value={values.birthdate}
            max={today}
            onChange={(e) => onChange("birthdate", e.target.value)}
            className={inputClass(!!errors.birthdate)}
          />
        </FormField>

        <FormField label="Gender" htmlFor="gender" error={errors.gender}>
          <select
            id="gender"
            value={values.gender}
            onChange={(e) => onChange("gender", e.target.value)}
            className={inputClass(!!errors.gender)}
          >
            <option value="">Select gender</option>
            {GENDER_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField
          label="Civil status"
          htmlFor="civil_status"
          error={errors.civil_status}
        >
          <select
            id="civil_status"
            value={values.civil_status}
            onChange={(e) => onChange("civil_status", e.target.value)}
            className={inputClass(!!errors.civil_status)}
          >
            <option value="">Select civil status</option>
            {CIVIL_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField
          label="Contact number"
          htmlFor="contact_number"
          error={errors.contact_number}
        >
          <input
            id="contact_number"
            type="tel"
            value={values.contact_number}
            onChange={(e) => onChange("contact_number", e.target.value)}
            placeholder="09123456789"
            className={inputClass(!!errors.contact_number)}
          />
        </FormField>
      </div>
    </section>
  );
}

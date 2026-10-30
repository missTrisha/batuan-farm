// src/components/farmers/form/AddressSection.tsx
import type {
  FarmerFormErrors,
  FarmerFormValues,
} from "../../../types/farmerForm";
import { useBarangays } from "../../../hooks/useBarangays";
import FormField from "./FormField";
import { inputClass } from "./fieldStyles";

interface Props {
  values: FarmerFormValues;
  errors: FarmerFormErrors;
  onChange: <K extends keyof FarmerFormValues>(
    field: K,
    value: FarmerFormValues[K],
  ) => void;
}

export default function AddressSection({ values, errors, onChange }: Props) {
  const { barangays, loading } = useBarangays();

  return (
    <section className="rounded-xl border border-green-200 bg-green-100 p-5 shadow-sm sm:p-6">
      <h2 className="text-base font-bold text-gray-900">Address</h2>
      <p className="mt-1 text-sm text-gray-600">
        All farmers are registered under a barangay of Batuan.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          label="Barangay"
          htmlFor="barangay_id"
          required
          error={errors.barangay_id}
        >
          <select
            id="barangay_id"
            value={values.barangay_id}
            onChange={(e) => onChange("barangay_id", e.target.value)}
            disabled={loading}
            className={inputClass(!!errors.barangay_id)}
          >
            <option value="">
              {loading ? "Loading barangays..." : "Select barangay"}
            </option>
            {barangays.map((barangay) => (
              <option key={barangay.id} value={barangay.id}>
                {barangay.name}
              </option>
            ))}
          </select>
        </FormField>

        <FormField
          label="Purok / Sitio"
          htmlFor="purok_sitio"
          error={errors.purok_sitio}
        >
          <input
            id="purok_sitio"
            type="text"
            value={values.purok_sitio}
            onChange={(e) => onChange("purok_sitio", e.target.value)}
            className={inputClass(!!errors.purok_sitio)}
          />
        </FormField>
      </div>
    </section>
  );
}

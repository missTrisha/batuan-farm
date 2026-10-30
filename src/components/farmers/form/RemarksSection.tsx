// src/components/farmers/form/RemarksSection.tsx
import type {
  FarmerFormErrors,
  FarmerFormValues,
} from "../../../types/farmerForm";
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

export default function RemarksSection({ values, errors, onChange }: Props) {
  return (
    <section className="rounded-xl border border-green-200 bg-green-100 p-5 shadow-sm sm:p-6">
      <h2 className="text-base font-bold text-gray-900">Remarks</h2>
      <p className="mt-1 text-sm text-gray-600">
        Optional. Add any notes about the farmer.
      </p>

      <div className="mt-5">
        <FormField label="Remarks" htmlFor="remarks" error={errors.remarks}>
          <textarea
            id="remarks"
            rows={4}
            value={values.remarks}
            onChange={(e) => onChange("remarks", e.target.value)}
            maxLength={500}
            className={inputClass(!!errors.remarks)}
          />
        </FormField>
      </div>
    </section>
  );
}

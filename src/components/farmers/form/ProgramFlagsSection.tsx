// src/components/farmers/form/ProgramFlagsSection.tsx
import type {
  FarmerFormErrors,
  FarmerFormValues,
} from "../../../types/farmerForm";
import FlagCheckbox from "./FlagCheckbox";
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

export default function ProgramFlagsSection({
  values,
  errors,
  onChange,
}: Props) {
  function handleIndigenousChange(checked: boolean) {
    onChange("is_indigenous", checked);
    // The group only applies to indigenous farmers, so clear it when unchecked.
    if (!checked) {
      onChange("indigenous_group", "");
    }
  }

  return (
    <section className="rounded-xl border border-green-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-base font-bold text-gray-900">Program details</h2>
      <p className="mt-1 text-sm text-gray-500">
        Check all that apply to the farmer.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <FlagCheckbox
          id="is_4ps_beneficiary"
          label="4Ps beneficiary"
          checked={values.is_4ps_beneficiary}
          onChange={(checked) => onChange("is_4ps_beneficiary", checked)}
        />
        <FlagCheckbox
          id="is_pwd"
          label="Person with disability (PWD)"
          checked={values.is_pwd}
          onChange={(checked) => onChange("is_pwd", checked)}
        />
        <FlagCheckbox
          id="is_indigenous"
          label="Indigenous person"
          checked={values.is_indigenous}
          onChange={handleIndigenousChange}
        />
      </div>

      {values.is_indigenous && (
        <div className="mt-4 sm:max-w-sm">
          <FormField
            label="Indigenous group"
            htmlFor="indigenous_group"
            required
            error={errors.indigenous_group}
          >
            <input
              id="indigenous_group"
              type="text"
              value={values.indigenous_group}
              onChange={(e) => onChange("indigenous_group", e.target.value)}
              className={inputClass(!!errors.indigenous_group)}
            />
          </FormField>
        </div>
      )}
    </section>
  );
}

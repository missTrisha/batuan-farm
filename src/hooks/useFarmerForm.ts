// src/hooks/useFarmerForm.ts
import { useCallback, useState } from "react";
import {
  EMPTY_FARMER_FORM,
  type FarmerFormErrors,
  type FarmerFormValues,
} from "../types/farmerForm";
import { validateFarmerForm } from "../lib/validateFarmerForm";

export function useFarmerForm() {
  const [values, setValues] = useState<FarmerFormValues>(EMPTY_FARMER_FORM);
  const [errors, setErrors] = useState<FarmerFormErrors>({});

  // Updates one field and clears that field's error.
  // Uses functional updates because two fields can change in one event.
  const setField = useCallback(
    <K extends keyof FarmerFormValues>(
      field: K,
      value: FarmerFormValues[K],
    ) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => {
        if (!prev[field]) return prev;
        const next = { ...prev };
        delete next[field];
        return next;
      });
    },
    [],
  );

  // Runs the checks, stores the errors, and returns true when the form is valid.
  const validate = useCallback((): boolean => {
    const found = validateFarmerForm(values);
    setErrors(found);
    return Object.keys(found).length === 0;
  }, [values]);

  const reset = useCallback(() => {
    setValues(EMPTY_FARMER_FORM);
    setErrors({});
  }, []);

  return { values, errors, setField, validate, reset };
}

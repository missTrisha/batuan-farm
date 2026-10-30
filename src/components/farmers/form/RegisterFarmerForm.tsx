// src/components/farmers/form/RegisterFarmerForm.tsx
import { useState, type FormEvent } from "react";
import { FiLoader } from "react-icons/fi";
import type { FarmerInput } from "../../../types/farmer";
import { toFarmerInput } from "../../../types/farmerForm";
import { useFarmerForm } from "../../../hooks/useFarmerForm";
import PersonalInfoSection from "./PersonalInfoSection";
import AddressSection from "./AddressSection";
import ProgramFlagsSection from "./ProgramFlagsSection";
import RemarksSection from "./RemarksSection";
import PhotoSection from "./PhotoSection";

interface Props {
  onSubmit: (input: FarmerInput, photo: File | null) => Promise<void>;
  onCancel: () => void;
}

export default function RegisterFarmerForm({ onSubmit, onCancel }: Props) {
  const { values, errors, setField, validate } = useFarmerForm();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    setSubmitting(true);
    try {
      await onSubmit(toFarmerInput(values), photoFile);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Could not register the farmer.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <PhotoSection
        file={photoFile}
        onChange={setPhotoFile}
        disabled={submitting}
      />
      <PersonalInfoSection
        values={values}
        errors={errors}
        onChange={setField}
      />
      <AddressSection values={values} errors={errors} onChange={setField} />
      <ProgramFlagsSection
        values={values}
        errors={errors}
        onChange={setField}
      />
      <RemarksSection values={values} errors={errors} onChange={setField} />

      {submitError && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {submitError}
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="rounded-lg border border-green-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting && (
            <FiLoader className="animate-spin" aria-hidden="true" />
          )}
          {submitting ? "Registering..." : "Register farmer"}
        </button>
      </div>
    </form>
  );
}

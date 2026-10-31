// src/components/farmers/FarmerPersonalInfoSection.tsx
import { useEffect, useState } from "react";
import type { FarmerDetails } from "../../hooks/useFarmer";
import { updateFarmer } from "../../lib/updateFarmer";
import EditableSection from "./EditableSection";
import DetailItem from "./DetailItem";
import FormField from "./form/FormField";
import { inputClass } from "./form/fieldStyles";
import {
  CIVIL_STATUS_OPTIONS,
  GENDER_OPTIONS,
} from "./form/PersonalInfoSection";

interface Props {
  farmer: FarmerDetails;
  canEdit: boolean;
  onSaved: () => void; // e.g. the page's reload
}

interface Draft {
  rsbsa_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  suffix: string;
  birthdate: string;
  gender: string;
  civil_status: string;
  contact_number: string;
}

type DraftErrors = Partial<Record<keyof Draft, string>>;

function draftFrom(farmer: FarmerDetails): Draft {
  return {
    rsbsa_id: farmer.rsbsa_id ?? "",
    first_name: farmer.first_name,
    middle_name: farmer.middle_name ?? "",
    last_name: farmer.last_name,
    suffix: farmer.suffix ?? "",
    birthdate: farmer.birthdate ?? "",
    gender: farmer.gender ?? "",
    civil_status: farmer.civil_status ?? "",
    contact_number: farmer.contact_number ?? "",
  };
}

// Empty inputs are saved as null, never as an empty string.
function toNull(text: string): string | null {
  const trimmed = text.trim();
  return trimmed === "" ? null : trimmed;
}

function labelFor(
  options: { value: string; label: string }[],
  value: string | null,
): string | null {
  if (!value) return null;
  return options.find((option) => option.value === value)?.label ?? value;
}

function formatDate(date: string | null): string | null {
  if (!date) return null;
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function FarmerPersonalInfoSection({
  farmer,
  canEdit,
  onSaved,
}: Props) {
  const [draft, setDraft] = useState<Draft>(() => draftFrom(farmer));
  const [errors, setErrors] = useState<DraftErrors>({});
  const today = new Date().toISOString().slice(0, 10);

  // Pick up fresh values after the page reloads the farmer.
  useEffect(() => {
    setDraft(draftFrom(farmer));
  }, [farmer]);

  function setField(field: keyof Draft, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function handleCancel() {
    setDraft(draftFrom(farmer));
    setErrors({});
  }

  async function handleSave() {
    const found: DraftErrors = {};
    if (!draft.first_name.trim()) found.first_name = "First name is required.";
    if (!draft.last_name.trim()) found.last_name = "Last name is required.";

    setErrors(found);
    if (Object.keys(found).length > 0) {
      throw new Error("Please fix the highlighted fields.");
    }

    await updateFarmer(farmer.id, {
      rsbsa_id: toNull(draft.rsbsa_id),
      first_name: draft.first_name.trim(),
      middle_name: toNull(draft.middle_name),
      last_name: draft.last_name.trim(),
      suffix: toNull(draft.suffix),
      birthdate: toNull(draft.birthdate),
      gender: toNull(draft.gender),
      civil_status: toNull(draft.civil_status),
      contact_number: toNull(draft.contact_number),
    });

    onSaved();
  }

  return (
    <EditableSection
      title="Personal information"
      canEdit={canEdit}
      onSave={handleSave}
      onCancel={handleCancel}
      renderView={() => (
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-4">
            <DetailItem label="RSBSA ID" value={farmer.rsbsa_id} />
          </div>
          <DetailItem label="First name" value={farmer.first_name} />
          <DetailItem label="Middle name" value={farmer.middle_name} />
          <DetailItem label="Last name" value={farmer.last_name} />
          <DetailItem label="Suffix" value={farmer.suffix} />
          <DetailItem label="Birthdate" value={formatDate(farmer.birthdate)} />
          <DetailItem
            label="Gender"
            value={labelFor(GENDER_OPTIONS, farmer.gender)}
          />
          <DetailItem
            label="Civil status"
            value={labelFor(CIVIL_STATUS_OPTIONS, farmer.civil_status)}
          />
          <DetailItem label="Contact number" value={farmer.contact_number} />
        </dl>
      )}
      renderForm={() => (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-4">
            <FormField
              label="RSBSA ID"
              htmlFor="edit_rsbsa_id"
              hint="Only if the farmer already has one from the logbook."
              error={errors.rsbsa_id}
            >
              <input
                id="edit_rsbsa_id"
                type="text"
                value={draft.rsbsa_id}
                onChange={(e) => setField("rsbsa_id", e.target.value)}
                maxLength={50}
                className={inputClass(!!errors.rsbsa_id)}
              />
            </FormField>
          </div>

          <FormField
            label="First name"
            htmlFor="edit_first_name"
            required
            error={errors.first_name}
          >
            <input
              id="edit_first_name"
              type="text"
              value={draft.first_name}
              onChange={(e) => setField("first_name", e.target.value)}
              className={inputClass(!!errors.first_name)}
            />
          </FormField>

          <FormField label="Middle name" htmlFor="edit_middle_name">
            <input
              id="edit_middle_name"
              type="text"
              value={draft.middle_name}
              onChange={(e) => setField("middle_name", e.target.value)}
              className={inputClass(false)}
            />
          </FormField>

          <FormField
            label="Last name"
            htmlFor="edit_last_name"
            required
            error={errors.last_name}
          >
            <input
              id="edit_last_name"
              type="text"
              value={draft.last_name}
              onChange={(e) => setField("last_name", e.target.value)}
              className={inputClass(!!errors.last_name)}
            />
          </FormField>

          <FormField label="Suffix" htmlFor="edit_suffix">
            <input
              id="edit_suffix"
              type="text"
              value={draft.suffix}
              onChange={(e) => setField("suffix", e.target.value)}
              placeholder="Jr., Sr., III"
              className={inputClass(false)}
            />
          </FormField>

          <FormField label="Birthdate" htmlFor="edit_birthdate">
            <input
              id="edit_birthdate"
              type="date"
              value={draft.birthdate}
              max={today}
              onChange={(e) => setField("birthdate", e.target.value)}
              className={inputClass(false)}
            />
          </FormField>

          <FormField label="Gender" htmlFor="edit_gender">
            <select
              id="edit_gender"
              value={draft.gender}
              onChange={(e) => setField("gender", e.target.value)}
              className={inputClass(false)}
            >
              <option value="">Select gender</option>
              {GENDER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Civil status" htmlFor="edit_civil_status">
            <select
              id="edit_civil_status"
              value={draft.civil_status}
              onChange={(e) => setField("civil_status", e.target.value)}
              className={inputClass(false)}
            >
              <option value="">Select civil status</option>
              {CIVIL_STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Contact number" htmlFor="edit_contact_number">
            <input
              id="edit_contact_number"
              type="tel"
              value={draft.contact_number}
              onChange={(e) => setField("contact_number", e.target.value)}
              placeholder="09123456789"
              className={inputClass(false)}
            />
          </FormField>
        </div>
      )}
    />
  );
}

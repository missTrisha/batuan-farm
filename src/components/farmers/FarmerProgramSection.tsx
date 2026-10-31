// src/components/farmers/FarmerProgramSection.tsx
import { useEffect, useState } from "react";
import type { FarmerDetails } from "../../hooks/useFarmer";
import { updateFarmer } from "../../lib/updateFarmer";
import EditableSection from "./EditableSection";
import DetailItem from "./DetailItem";
import FlagCheckbox from "./form/FlagCheckbox";
import FormField from "./form/FormField";
import { inputClass } from "./form/fieldStyles";

interface Props {
  farmer: FarmerDetails;
  canEdit: boolean;
  onSaved: () => void; // e.g. the page's reload
}

interface Draft {
  is_4ps_beneficiary: boolean;
  is_pwd: boolean;
  is_indigenous: boolean;
  indigenous_group: string;
}

function draftFrom(farmer: FarmerDetails): Draft {
  return {
    is_4ps_beneficiary: farmer.is_4ps_beneficiary,
    is_pwd: farmer.is_pwd,
    is_indigenous: farmer.is_indigenous,
    indigenous_group: farmer.indigenous_group ?? "",
  };
}

function yesNo(value: boolean): string {
  return value ? "Yes" : "No";
}

export default function FarmerProgramSection({
  farmer,
  canEdit,
  onSaved,
}: Props) {
  const [draft, setDraft] = useState<Draft>(() => draftFrom(farmer));
  const [groupError, setGroupError] = useState<string | undefined>();

  // Pick up fresh values after the page reloads the farmer.
  useEffect(() => {
    setDraft(draftFrom(farmer));
  }, [farmer]);

  function setFlag(field: keyof Draft, value: boolean | string) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function handleIndigenousChange(checked: boolean) {
    setDraft((current) => ({
      ...current,
      is_indigenous: checked,
      // The group only applies to indigenous farmers.
      indigenous_group: checked ? current.indigenous_group : "",
    }));
    if (!checked) setGroupError(undefined);
  }

  function handleCancel() {
    setDraft(draftFrom(farmer));
    setGroupError(undefined);
  }

  async function handleSave() {
    const group = draft.indigenous_group.trim();

    if (draft.is_indigenous && !group) {
      setGroupError("Please specify the indigenous group.");
      throw new Error("Please fix the highlighted fields.");
    }
    setGroupError(undefined);

    await updateFarmer(farmer.id, {
      is_4ps_beneficiary: draft.is_4ps_beneficiary,
      is_pwd: draft.is_pwd,
      is_indigenous: draft.is_indigenous,
      indigenous_group: draft.is_indigenous ? group : null,
    });

    onSaved();
  }

  return (
    <EditableSection
      title="Program details"
      canEdit={canEdit}
      onSave={handleSave}
      onCancel={handleCancel}
      renderView={() => (
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DetailItem
            label="4Ps beneficiary"
            value={yesNo(farmer.is_4ps_beneficiary)}
          />
          <DetailItem label="PWD" value={yesNo(farmer.is_pwd)} />
          <DetailItem
            label="Indigenous person"
            value={yesNo(farmer.is_indigenous)}
          />
          {farmer.is_indigenous && (
            <DetailItem
              label="Indigenous group"
              value={farmer.indigenous_group}
            />
          )}
        </dl>
      )}
      renderForm={() => (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FlagCheckbox
              id="edit_is_4ps_beneficiary"
              label="4Ps beneficiary"
              checked={draft.is_4ps_beneficiary}
              onChange={(checked) => setFlag("is_4ps_beneficiary", checked)}
            />
            <FlagCheckbox
              id="edit_is_pwd"
              label="Person with disability (PWD)"
              checked={draft.is_pwd}
              onChange={(checked) => setFlag("is_pwd", checked)}
            />
            <FlagCheckbox
              id="edit_is_indigenous"
              label="Indigenous person"
              checked={draft.is_indigenous}
              onChange={handleIndigenousChange}
            />
          </div>

          {draft.is_indigenous && (
            <div className="sm:max-w-sm">
              <FormField
                label="Indigenous group"
                htmlFor="edit_indigenous_group"
                required
                error={groupError}
              >
                <input
                  id="edit_indigenous_group"
                  type="text"
                  value={draft.indigenous_group}
                  onChange={(e) => setFlag("indigenous_group", e.target.value)}
                  className={inputClass(!!groupError)}
                />
              </FormField>
            </div>
          )}
        </div>
      )}
    />
  );
}

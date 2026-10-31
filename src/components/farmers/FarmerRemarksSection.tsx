// src/components/farmers/FarmerRemarksSection.tsx
import { useEffect, useState } from "react";
import type { FarmerDetails } from "../../hooks/useFarmer";
import { updateFarmer } from "../../lib/updateFarmer";
import EditableSection from "./EditableSection";
import FormField from "./form/FormField";
import { inputClass } from "./form/fieldStyles";

interface Props {
  farmer: FarmerDetails;
  canEdit: boolean;
  onSaved: () => void; // e.g. the page's reload
}

export default function FarmerRemarksSection({
  farmer,
  canEdit,
  onSaved,
}: Props) {
  const [draft, setDraft] = useState(farmer.remarks ?? "");

  // Pick up fresh values after the page reloads the farmer.
  useEffect(() => {
    setDraft(farmer.remarks ?? "");
  }, [farmer]);

  function handleCancel() {
    setDraft(farmer.remarks ?? "");
  }

  async function handleSave() {
    const text = draft.trim();

    await updateFarmer(farmer.id, {
      remarks: text === "" ? null : text,
    });

    onSaved();
  }

  return (
    <EditableSection
      title="Remarks"
      canEdit={canEdit}
      onSave={handleSave}
      onCancel={handleCancel}
      renderView={() =>
        farmer.remarks ? (
          <p className="whitespace-pre-wrap text-sm text-gray-900">
            {farmer.remarks}
          </p>
        ) : (
          <p className="text-sm italic text-gray-600">No remarks.</p>
        )
      }
      renderForm={() => (
        <FormField label="Remarks" htmlFor="edit_remarks">
          <textarea
            id="edit_remarks"
            rows={4}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            maxLength={500}
            className={inputClass(false)}
          />
        </FormField>
      )}
    />
  );
}

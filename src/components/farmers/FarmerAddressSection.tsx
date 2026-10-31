// src/components/farmers/FarmerAddressSection.tsx
import { useEffect, useState } from "react";
import type { FarmerDetails } from "../../hooks/useFarmer";
import { useBarangays } from "../../hooks/useBarangays";
import { updateFarmer } from "../../lib/updateFarmer";
import EditableSection from "./EditableSection";
import DetailItem from "./DetailItem";
import FormField from "./form/FormField";
import { inputClass } from "./form/fieldStyles";

interface Props {
  farmer: FarmerDetails;
  canEdit: boolean;
  onSaved: () => void; // e.g. the page's reload
}

interface Draft {
  barangay_id: string;
  purok_sitio: string;
}

function draftFrom(farmer: FarmerDetails): Draft {
  return {
    barangay_id: farmer.barangay_id,
    purok_sitio: farmer.purok_sitio ?? "",
  };
}

export default function FarmerAddressSection({
  farmer,
  canEdit,
  onSaved,
}: Props) {
  const { barangays, loading: loadingBarangays } = useBarangays();
  const [draft, setDraft] = useState<Draft>(() => draftFrom(farmer));
  const [barangayError, setBarangayError] = useState<string | undefined>();

  // Pick up fresh values after the page reloads the farmer.
  useEffect(() => {
    setDraft(draftFrom(farmer));
  }, [farmer]);

  function handleCancel() {
    setDraft(draftFrom(farmer));
    setBarangayError(undefined);
  }

  async function handleSave() {
    if (!draft.barangay_id) {
      setBarangayError("Barangay is required.");
      throw new Error("Please fix the highlighted fields.");
    }
    setBarangayError(undefined);

    const purok = draft.purok_sitio.trim();

    await updateFarmer(farmer.id, {
      barangay_id: draft.barangay_id,
      purok_sitio: purok === "" ? null : purok,
    });

    onSaved();
  }

  return (
    <EditableSection
      title="Address"
      canEdit={canEdit}
      onSave={handleSave}
      onCancel={handleCancel}
      renderView={() => (
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DetailItem label="Barangay" value={farmer.barangay?.name} />
          <DetailItem label="Purok / Sitio" value={farmer.purok_sitio} />
        </dl>
      )}
      renderForm={() => (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            label="Barangay"
            htmlFor="edit_barangay_id"
            required
            error={barangayError}
          >
            <select
              id="edit_barangay_id"
              value={draft.barangay_id}
              onChange={(e) =>
                setDraft((current) => ({
                  ...current,
                  barangay_id: e.target.value,
                }))
              }
              disabled={loadingBarangays}
              className={inputClass(!!barangayError)}
            >
              <option value="">
                {loadingBarangays ? "Loading barangays..." : "Select barangay"}
              </option>
              {barangays.map((barangay) => (
                <option key={barangay.id} value={barangay.id}>
                  {barangay.name}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Purok / Sitio" htmlFor="edit_purok_sitio">
            <input
              id="edit_purok_sitio"
              type="text"
              value={draft.purok_sitio}
              onChange={(e) =>
                setDraft((current) => ({
                  ...current,
                  purok_sitio: e.target.value,
                }))
              }
              className={inputClass(false)}
            />
          </FormField>
        </div>
      )}
    />
  );
}

// src/pages/FarmerDetailsPage.tsx
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useFarmer } from "../hooks/useFarmer";
import FarmerDetailsHeader from "../components/farmers/form/FarmerDetailsHeader";
import FarmerPersonalInfoSection from "../components/farmers/FarmerPersonalInfoSection";
import FarmerAddressSection from "../components/farmers/FarmerAddressSection";
import FarmerProgramSection from "../components/farmers/FarmerProgramSection";
import FarmerRemarksSection from "../components/farmers/FarmerRemarksSection";

export default function FarmerDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { farmer, loading, error, notFound, reload } = useFarmer(id);

  return (
    <div className="space-y-4">
      <Link
        to="/farmers"
        className="inline-flex items-center gap-2 text-sm font-medium text-green-800 hover:text-green-900"
      >
        <FiArrowLeft aria-hidden="true" />
        Back to farmers
      </Link>

      {loading && <p className="text-sm text-gray-600">Loading farmer...</p>}

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          Could not load farmer: {error}
        </p>
      )}

      {notFound && (
        <p className="rounded-lg bg-green-100 px-4 py-3 text-sm text-gray-700">
          Farmer not found. The link may be wrong, or the record was removed.
        </p>
      )}

      {farmer && (
        <>
          <FarmerDetailsHeader farmer={farmer} />
          <FarmerPersonalInfoSection
            farmer={farmer}
            canEdit={true}
            onSaved={reload}
          />
          <FarmerAddressSection
            farmer={farmer}
            canEdit={true}
            onSaved={reload}
          />
          <FarmerProgramSection
            farmer={farmer}
            canEdit={true}
            onSaved={reload}
          />
          <FarmerRemarksSection
            farmer={farmer}
            canEdit={true}
            onSaved={reload}
          />
        </>
      )}
    </div>
  );
}

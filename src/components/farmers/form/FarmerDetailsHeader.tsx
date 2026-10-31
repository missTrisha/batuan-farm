// src/components/farmers/FarmerDetailsHeader.tsx
import { FiUser } from "react-icons/fi";
import type { FarmerDetails } from "../../../hooks/useFarmer";
import { useSignedPhotoUrl } from "../../../hooks/useSignedPhotoUrl";
import FarmerStatusBadge from "../FarmerStatusBadge";

interface FarmerDetailsHeaderProps {
  farmer: FarmerDetails;
}

function fullName(farmer: FarmerDetails): string {
  return [
    farmer.first_name,
    farmer.middle_name,
    farmer.last_name,
    farmer.suffix,
  ]
    .filter(Boolean)
    .join(" ");
}

export default function FarmerDetailsHeader({
  farmer,
}: FarmerDetailsHeaderProps) {
  const { url, loading } = useSignedPhotoUrl(farmer.photo_path);
  const name = fullName(farmer);

  return (
    <section className="flex flex-col items-center gap-4 rounded-xl bg-green-100 p-5 sm:flex-row sm:items-center">
      <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-green-200">
        {url ? (
          <img
            src={url}
            alt={`Photo of ${name}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className={`flex h-full w-full items-center justify-center text-green-700 ${
              loading ? "animate-pulse" : ""
            }`}
          >
            <FiUser className="h-12 w-12" aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="space-y-2 text-center sm:text-left">
        <h2 className="font-serif text-2xl font-bold text-gray-900">{name}</h2>
        <p className="text-sm text-gray-700">
          Farmer No.{" "}
          <span className="font-semibold">
            {farmer.farmer_number ?? "Not yet assigned"}
          </span>
        </p>
        <FarmerStatusBadge status={farmer.status} />
      </div>
    </section>
  );
}

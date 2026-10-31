// src/components/farmers/FarmerRow.tsx
import { Link, useNavigate } from "react-router-dom";
import type { Farmer } from "../../types/farmer";
import FarmerStatusBadge from "./FarmerStatusBadge";

interface Props {
  rowNumber: number; // display only, renumbers by position
  farmer: Farmer;
  barangayName: string;
  purokSitio: string | null;
}

function buildFullName(farmer: Farmer): string {
  const middleInitial = farmer.middle_name
    ? `${farmer.middle_name.charAt(0).toUpperCase()}.`
    : "";

  const given = [farmer.first_name, middleInitial].filter(Boolean).join(" ");
  const suffix = farmer.suffix ? ` ${farmer.suffix}` : "";

  return `${farmer.last_name}, ${given}${suffix}`;
}

export default function FarmerRow({
  rowNumber,
  farmer,
  barangayName,
  purokSitio,
}: Props) {
  const navigate = useNavigate();
  const detailsPath = `/farmers/${farmer.id}`;

  return (
    <tr
      onClick={() => navigate(detailsPath)}
      className="cursor-pointer border-b border-green-200 transition-colors last:border-0 hover:bg-green-200"
    >
      <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-gray-600">
        {rowNumber}
      </td>
      <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-700">
        {farmer.farmer_number ?? (
          <span className="text-xs italic text-gray-500">Awaiting sync</span>
        )}
      </td>
      <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-700">
        {farmer.rsbsa_id ?? "—"}
      </td>
      <td className="px-5 py-4 text-sm font-semibold text-gray-900">
        <Link
          to={detailsPath}
          onClick={(event) => event.stopPropagation()}
          className="hover:text-green-800 hover:underline"
        >
          {buildFullName(farmer)}
        </Link>
      </td>
      <td className="px-5 py-4 text-sm text-gray-700">{barangayName}</td>
      <td className="px-5 py-4 text-sm text-gray-700">{purokSitio}</td>
      <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-700">
        {farmer.contact_number ?? "—"}
      </td>
      <td className="px-5 py-4">
        <FarmerStatusBadge status={farmer.status} />
      </td>
    </tr>
  );
}

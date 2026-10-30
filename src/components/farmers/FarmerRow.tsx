// src/components/farmers/FarmerRow.tsx
import type { Farmer } from "../../types/farmer";
import FarmerStatusBadge from "./FarmerStatusBadge";

interface Props {
  rowNumber: number; // display only, renumbers by position
  farmer: Farmer;
  barangayName: string;
}

function buildFullName(farmer: Farmer): string {
  const middleInitial = farmer.middle_name
    ? `${farmer.middle_name.charAt(0).toUpperCase()}.`
    : "";

  const given = [farmer.first_name, middleInitial].filter(Boolean).join(" ");
  const suffix = farmer.suffix ? ` ${farmer.suffix}` : "";

  return `${farmer.last_name}, ${given}${suffix}`;
}

export default function FarmerRow({ rowNumber, farmer, barangayName }: Props) {
  return (
    <tr className="border-b border-green-200 transition-colors last:border-0 hover:bg-green-200">
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
        {buildFullName(farmer)}
      </td>
      <td className="px-5 py-4 text-sm text-gray-700">{barangayName}</td>
      <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-700">
        {farmer.contact_number ?? "—"}
      </td>
      <td className="px-5 py-4">
        <FarmerStatusBadge status={farmer.status} />
      </td>
    </tr>
  );
}

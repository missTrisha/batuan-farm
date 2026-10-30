// src/components/farmers/FarmersTable.tsx
import { useMemo } from "react";
import type { Farmer } from "../../types/farmer";
import { useBarangays } from "../../hooks/useBarangays";
import FarmerRow from "./FarmerRow";
import FarmersEmptyState from "./FarmersEmptyState";

const COLUMNS = [
  "No.",
  "Farmer Local ID",
  "RSBSA ID",
  "Name",
  "Barangay",
  "Contact",
  "Status",
];

interface Props {
  farmers: Farmer[];
  loading: boolean;
}

export default function FarmersTable({ farmers, loading }: Props) {
  const { barangays } = useBarangays();

  // id -> name lookup, so each row doesn't need its own query
  const barangayNames = useMemo(() => {
    const map = new Map<string, string>();
    barangays.forEach((b) => map.set(b.id, b.name));
    return map;
  }, [barangays]);

  return (
    <div className="overflow-x-auto rounded-xl border border-green-200 bg-green-100 shadow-sm">
      <table className="min-w-full text-left">
        <thead className="bg-green-700">
          <tr>
            {COLUMNS.map((column) => (
              <th
                key={column}
                scope="col"
                className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wider text-green-50"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-green-100">
          {loading && farmers.length === 0 ? (
            <tr>
              <td
                colSpan={COLUMNS.length}
                className="px-5 py-12 text-center text-sm text-gray-600"
              >
                Loading farmers...
              </td>
            </tr>
          ) : farmers.length === 0 ? (
            <tr>
              <td colSpan={COLUMNS.length}>
                <FarmersEmptyState />
              </td>
            </tr>
          ) : (
            farmers.map((farmer, index) => (
              <FarmerRow
                key={farmer.id}
                rowNumber={index + 1}
                farmer={farmer}
                barangayName={barangayNames.get(farmer.barangay_id) ?? "—"}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

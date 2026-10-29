// src/components/farmers/FarmerStatusFilter.tsx
import type { FarmerStatus } from "../../types/farmer";

export type StatusFilterValue = FarmerStatus | "all";

const OPTIONS: { value: StatusFilterValue; label: string }[] = [
  { value: "all", label: "All statuses" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "inactive", label: "Inactive" },
];

interface Props {
  value: StatusFilterValue;
  onChange: (value: StatusFilterValue) => void;
}

export default function FarmerStatusFilter({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as StatusFilterValue)}
      aria-label="Filter by status"
      className="rounded-lg border border-green-200 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm hover:border-green-400 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600/30"
    >
      {OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

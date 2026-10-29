// src/components/farmers/FarmerBarangayFilter.tsx
import { useBarangays } from "../../hooks/useBarangays";

// Barangay id, or 'all' for no barangay filter.
export type BarangayFilterValue = string | "all";

interface Props {
  value: BarangayFilterValue;
  onChange: (value: BarangayFilterValue) => void;
}

export default function FarmerBarangayFilter({ value, onChange }: Props) {
  const { barangays, loading } = useBarangays();

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={loading}
      aria-label="Filter by barangay"
      className="rounded-lg border border-green-200 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm hover:border-green-400 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600/30 disabled:cursor-not-allowed disabled:bg-green-50"
    >
      <option value="all">All barangays</option>
      {barangays.map((barangay) => (
        <option key={barangay.id} value={barangay.id}>
          {barangay.name}
        </option>
      ))}
    </select>
  );
}

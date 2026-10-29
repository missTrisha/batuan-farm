// src/components/farmers/FarmerSearchInput.tsx
import { FiSearch } from "react-icons/fi";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function FarmerSearchInput({ value, onChange }: Props) {
  return (
    <div className="relative w-full sm:max-w-xs">
      <FiSearch
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-green-600"
        aria-hidden="true"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search name, farmer no., or RSBSA ID"
        aria-label="Search farmers"
        className="w-full rounded-lg border border-green-200 bg-white py-2.5 pl-9 pr-3 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 hover:border-green-400 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600/30"
      />
    </div>
  );
}

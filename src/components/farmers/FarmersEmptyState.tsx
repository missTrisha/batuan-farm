// src/components/farmers/FarmersEmptyState.tsx
import { FiUsers } from "react-icons/fi";

export default function FarmersEmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 px-5 py-14 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-green-100 text-green-700">
        <FiUsers className="text-3xl" aria-hidden="true" />
      </div>
      <div>
        <p className="text-base font-semibold text-gray-900">
          No farmers found
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Try a different search or filter, or register a new farmer.
        </p>
      </div>
    </div>
  );
}

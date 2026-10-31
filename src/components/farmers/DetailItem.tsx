// src/components/farmers/DetailItem.tsx
import type { ReactNode } from "react";

interface DetailItemProps {
  label: string;
  value: ReactNode;
}

// One label and value pair. Use inside a <dl> grid. Empty values show a dash.
export default function DetailItem({ label, value }: DetailItemProps) {
  const isEmpty = value === null || value === undefined || value === "";

  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-gray-600">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-gray-900">{isEmpty ? "—" : value}</dd>
    </div>
  );
}

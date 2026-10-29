// src/components/farmers/FarmerStatusBadge.tsx
import type { FarmerStatus } from "../../types/farmer";

const STYLES: Record<FarmerStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  inactive: "bg-gray-100 text-gray-700",
};

const LABELS: Record<FarmerStatus, string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  inactive: "Inactive",
};

interface Props {
  status: FarmerStatus;
}

export default function FarmerStatusBadge({ status }: Props) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STYLES[status]}`}
    >
      {LABELS[status]}
    </span>
  );
}

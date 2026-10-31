// src/pages/FarmersPage.tsx
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import { useFarmers } from "../hooks/useFarmers";
import FarmerSearchInput from "../components/farmers/FarmerSearchInput";
import FarmerStatusFilter, {
  type StatusFilterValue,
} from "../components/farmers/FarmerStatusFilter";
import FarmerBarangayFilter, {
  type BarangayFilterValue,
} from "../components/farmers/FarmerBarangayFilter";
import FarmersTable from "../components/farmers/FarmersTable";
import Pagination, { PAGE_SIZE } from "../components/ui/Pagination";

export default function FarmersPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilterValue>("all");
  const [barangayId, setBarangayId] = useState<BarangayFilterValue>("all");

  const { farmers, total, page, setPage, loading, error } = useFarmers({
    search,
    status,
    barangayId,
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-serif text-2xl font-bold text-gray-900">Farmers</h1>
        <Link
          to="/farmers/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
        >
          <FiPlus aria-hidden="true" />
          Register farmer
        </Link>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <FarmerSearchInput value={search} onChange={setSearch} />
        <FarmerStatusFilter value={status} onChange={setStatus} />
        <FarmerBarangayFilter value={barangayId} onChange={setBarangayId} />
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          Could not load farmers: {error}
        </p>
      )}

      <FarmersTable
        farmers={farmers}
        loading={loading}
        startIndex={(page - 1) * PAGE_SIZE}
      />

      <Pagination
        page={page}
        pageSize={PAGE_SIZE}
        total={total}
        onPageChange={setPage}
        disabled={loading}
      />
    </div>
  );
}

// // src/pages/FarmersPage.tsx
// import { Link } from "react-router-dom";
// import { FiPlus } from "react-icons/fi";
// import { useState } from "react";
// import { useFarmers } from "../hooks/useFarmers";
// import FarmerSearchInput from "../components/farmers/FarmerSearchInput";
// import FarmerStatusFilter, {
//   type StatusFilterValue,
// } from "../components/farmers/FarmerStatusFilter";
// import FarmerBarangayFilter, {
//   type BarangayFilterValue,
// } from "../components/farmers/FarmerBarangayFilter";
// import FarmersTable from "../components/farmers/FarmersTable";

// export default function FarmersPage() {
//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState<StatusFilterValue>("all");
//   const [barangayId, setBarangayId] = useState<BarangayFilterValue>("all");

//   const { farmers, loading, error } = useFarmers({
//     search,
//     status,
//     barangayId,
//   });

//   return (
//     <div className="space-y-4">
//       <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//         <h1 className="font-serif text-2xl font-bold text-gray-900">Farmers</h1>
//         <Link
//           to="/farmers/new"
//           className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
//         >
//           <FiPlus aria-hidden="true" />
//           Register farmer
//         </Link>
//       </div>

//       <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
//         <FarmerSearchInput value={search} onChange={setSearch} />
//         <FarmerStatusFilter value={status} onChange={setStatus} />
//         <FarmerBarangayFilter value={barangayId} onChange={setBarangayId} />
//       </div>

//       {error && (
//         <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
//           Could not load farmers: {error}
//         </p>
//       )}

//       <FarmersTable farmers={farmers} loading={loading} />
//     </div>
//   );
// }

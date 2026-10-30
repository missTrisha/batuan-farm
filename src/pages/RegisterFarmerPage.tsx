// src/pages/RegisterFarmerPage.tsx
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import type { FarmerInput } from "../types/farmer";
import { registerFarmer } from "../lib/registerFarmer";
import RegisterFarmerForm from "../components/farmers/form/RegisterFarmerForm";

export default function RegisterFarmerPage() {
  const navigate = useNavigate();

  async function handleSubmit(input: FarmerInput, photo: File | null) {
    await registerFarmer(input, photo);
    navigate("/farmers");
  }
  return (
    <div className="mx-auto max-w-5xl">
      <Link
        to="/farmers"
        className="mb-5 inline-flex items-center gap-2 rounded-lg border border-green-300 bg-green-100 px-4 py-2 text-sm font-semibold text-green-800 shadow-sm transition hover:border-green-500 hover:bg-green-200"
      >
        <FiArrowLeft aria-hidden="true" />
        Back to farmers
      </Link>

      <RegisterFarmerForm
        onSubmit={handleSubmit}
        onCancel={() => navigate("/farmers")}
      />
    </div>
  );
}

// src/pages/RegisterFarmerPage.tsx
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import type { FarmerInput } from "../types/farmer";
import { registerFarmer } from "../lib/registerFarmer";
import RegisterFarmerForm from "../components/farmers/form/RegisterFarmerForm";

export default function RegisterFarmerPage() {
  const navigate = useNavigate();

  async function handleSubmit(input: FarmerInput) {
    await registerFarmer(input);
    navigate("/farmers");
  }

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        to="/farmers"
        className="inline-flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-800"
      >
        <FiArrowLeft aria-hidden="true" />
        Back to farmers
      </Link>

      <h1 className="mb-5 mt-3 font-serif text-2xl font-bold text-gray-900">
        Register farmer
      </h1>

      <RegisterFarmerForm
        onSubmit={handleSubmit}
        onCancel={() => navigate("/farmers")}
      />
    </div>
  );
}

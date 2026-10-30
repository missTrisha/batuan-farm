// src/components/farmers/form/PhotoSection.tsx
import FarmerPhotoUploader from "./FarmerPhotoUploader";

interface Props {
  file: File | null;
  onChange: (file: File | null) => void;
  disabled?: boolean;
}

export default function PhotoSection({ file, onChange, disabled }: Props) {
  return (
    <section className="rounded-xl border border-green-200 bg-green-100 p-5 shadow-sm sm:p-6">
      <h2 className="text-base font-bold text-gray-900">Farmer photo</h2>
      <p className="mt-1 text-sm text-gray-600">
        The photo is uploaded when you register the farmer.
      </p>

      <div className="mt-5">
        <FarmerPhotoUploader
          file={file}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
    </section>
  );
}

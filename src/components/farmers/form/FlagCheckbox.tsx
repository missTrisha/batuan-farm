// src/components/farmers/form/FlagCheckbox.tsx
interface Props {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function FlagCheckbox({
  id,
  label,
  description,
  checked,
  onChange,
}: Props) {
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition ${
        checked
          ? "border-green-600 bg-green-200"
          : "border-green-300 bg-green-100 hover:border-green-500 hover:bg-green-200"
      }`}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-green-400 accent-green-700"
      />
      <span className="flex flex-col">
        <span className="text-sm font-medium text-gray-900">{label}</span>
        {description && (
          <span className="text-xs text-gray-600">{description}</span>
        )}
      </span>
    </label>
  );
}

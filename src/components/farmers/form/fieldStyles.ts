// src/components/farmers/form/fieldStyles.ts

const BASE =
  "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-green-50";

const NORMAL =
  "border-green-200 hover:border-green-400 focus:border-green-600 focus:ring-green-600/30";

const INVALID =
  "border-red-400 hover:border-red-500 focus:border-red-600 focus:ring-red-600/30";

// Classes for text inputs, selects and textareas.
export function inputClass(hasError: boolean): string {
  return `${BASE} ${hasError ? INVALID : NORMAL}`;
}

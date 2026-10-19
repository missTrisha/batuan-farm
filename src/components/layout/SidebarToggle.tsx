// src/components/layout/SidebarToggle.tsx
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type SidebarToggleProps = {
  collapsed: boolean;
  onToggle: () => void;
};

export default function SidebarToggle({
  collapsed,
  onToggle,
}: SidebarToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      aria-expanded={!collapsed}
      className="absolute -right-3.5 top-7 z-50 hidden h-7 min-h-0 w-7 place-items-center rounded-full border border-line bg-white text-forest-800 shadow-md transition hover:bg-mint-100 hover:text-forest-900 lg:grid"
    >
      {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
    </button>
  );
}

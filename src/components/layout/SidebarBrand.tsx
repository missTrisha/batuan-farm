// src/components/layout/SidebarBrand.tsx
import logoImg from "../../assets/images/logo.jpg";

type SidebarBrandProps = {
  collapsed: boolean;
};

export default function SidebarBrand({ collapsed }: SidebarBrandProps) {
  return (
    <div
      className={`flex h-20 shrink-0 items-center ${
        collapsed ? "justify-center" : "gap-3 px-5"
      }`}
    >
      <img
        src={logoImg}
        alt="Batuan MAO logo"
        className="h-11 w-11 shrink-0 rounded-xl bg-black object-contain"
      />

      {!collapsed && (
        <div className="flex min-w-0 flex-col leading-tight">
          <span className="truncate font-serif text-sm font-bold">
            Batuan Agri-Input
          </span>
          <span className="truncate text-xs text-white/70">
            Distribution System
          </span>
        </div>
      )}
    </div>
  );
}

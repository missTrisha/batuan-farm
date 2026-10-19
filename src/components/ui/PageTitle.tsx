// src/components/ui/PageTitle.tsx
export default function PageTitle({ children }: { children: string }) {
  return <h1 className="font-serif text-3xl font-bold text-ink">{children}</h1>;
}

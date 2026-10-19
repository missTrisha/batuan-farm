// src/components/ui/FullScreenLoader.tsx
import Spinner from "./Spinner";

export default function FullScreenLoader() {
  return (
    <div className="grid min-h-screen place-items-center bg-page text-primary">
      <Spinner className="h-10 w-10" />
    </div>
  );
}

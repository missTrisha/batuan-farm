// src/components/ui/Avatar.tsx
import { useState } from "react";

type AvatarProps = {
  name: string;
  src?: string | null; // signed URL from useAvatarUrl; initials show when empty
  className?: string;
};

// "Juan Dela Cruz" -> "JD" (first and last word)
function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export default function Avatar({
  name,
  src,
  className = "h-10 w-10 text-sm",
}: AvatarProps) {
  // If the image fails to load (expired URL, deleted file), fall back to initials
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showImage = !!src && failedSrc !== src;

  if (showImage) {
    return (
      <img
        src={src!}
        alt=""
        onError={() => setFailedSrc(src!)}
        className={`shrink-0 rounded-full object-cover ${className}`}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full bg-forest-800 font-bold text-white ${className}`}
    >
      {getInitials(name)}
    </span>
  );
}

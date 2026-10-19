// src/hooks/useAvatarUrl.ts
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const BUCKET = "avatars";
const EXPIRES_IN_SECONDS = 60 * 60 * 24; // 24 hours

/**
 * Turns a stored avatar_path into a signed URL for the private bucket.
 * Returns null when there is no picture (show initials or an icon instead).
 */
export function useAvatarUrl(avatarPath: string | null | undefined) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!avatarPath) {
      setUrl(null);
      return;
    }

    let cancelled = false;

    supabase.storage
      .from(BUCKET)
      .createSignedUrl(avatarPath, EXPIRES_IN_SECONDS)
      .then(({ data, error }) => {
        if (cancelled) return;
        setUrl(error || !data ? null : data.signedUrl);
      });

    return () => {
      cancelled = true;
    };
  }, [avatarPath]);

  return url;
}

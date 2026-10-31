// src/hooks/useSignedPhotoUrl.ts
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const PHOTO_BUCKET = "farmer-photos";
const URL_LIFETIME_SECONDS = 60 * 60; // 1 hour

export function useSignedPhotoUrl(path: string | null) {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // No photo uploaded: nothing to sign.
    if (!path) {
      setUrl(null);
      setError(null);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function sign(photoPath: string) {
      setLoading(true);
      setError(null);
      setUrl(null);

      const { data, error } = await supabase.storage
        .from(PHOTO_BUCKET)
        .createSignedUrl(photoPath, URL_LIFETIME_SECONDS);

      if (cancelled) return;

      if (error || !data) {
        setError(error?.message ?? "Could not load photo");
      } else {
        setUrl(data.signedUrl);
      }
      setLoading(false);
    }

    sign(path);

    return () => {
      cancelled = true;
    };
  }, [path]);

  return { url, loading, error };
}

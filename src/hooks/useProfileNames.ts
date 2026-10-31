// src/hooks/useProfileNames.ts
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

interface ProfileRow {
  id: string;
  display_name: string | null;
  email: string;
}

// Looks up display names for a few user ids. Ids it cannot read are
// simply missing from the returned map, so the caller shows a fallback.
export function useProfileNames(ids: (string | null)[]) {
  const [names, setNames] = useState<Map<string, string>>(new Map());

  // A stable string key, so the effect only reruns when the ids really change.
  const key = Array.from(new Set(ids.filter(Boolean) as string[]))
    .sort()
    .join(",");

  useEffect(() => {
    if (!key) {
      setNames(new Map());
      return;
    }

    let cancelled = false;

    async function load() {
      const { data } = await supabase
        .from("profiles")
        .select("id, display_name, email")
        .in("id", key.split(","));

      if (cancelled) return;

      const map = new Map<string, string>();
      ((data ?? []) as ProfileRow[]).forEach((profile) => {
        map.set(profile.id, profile.display_name || profile.email);
      });
      setNames(map);
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [key]);

  return names;
}

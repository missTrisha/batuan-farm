// src/hooks/useBarangays.ts
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export interface Barangay {
  id: string;
  name: string;
  is_active: boolean;
}

// Module-level cache: the 14 barangays are fixed, so we load them once
// and reuse them across every page and form.
let cache: Barangay[] | null = null;

export function useBarangays() {
  const [barangays, setBarangays] = useState<Barangay[]>(cache ?? []);
  const [loading, setLoading] = useState(cache === null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cache !== null) return;

    let cancelled = false;

    async function load() {
      const { data, error } = await supabase
        .from("barangays")
        .select("id, name, is_active")
        .eq("is_active", true)
        .order("name", { ascending: true });

      if (cancelled) return;

      if (error) {
        setError(error.message);
      } else {
        cache = data ?? [];
        setBarangays(cache);
      }
      setLoading(false);
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { barangays, loading, error };
}

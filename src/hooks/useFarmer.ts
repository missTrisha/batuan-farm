// src/hooks/useFarmer.ts
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Farmer } from "../types/farmer";

// A farmer row plus the barangay name joined in from the barangays table.
export interface FarmerDetails extends Farmer {
  barangay: { name: string } | null;
}

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function useFarmer(id: string | undefined) {
  const [farmer, setFarmer] = useState<FarmerDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [reloadCount, setReloadCount] = useState(0);

  // Lets the page refetch after something changes (approve or reject later).
  const reload = useCallback(() => setReloadCount((count) => count + 1), []);

  useEffect(() => {
    // A typed-in link that is not a UUID would make Postgres throw,
    // so treat it as "not found" without asking the database.
    if (!id || !UUID_PATTERN.test(id)) {
      setFarmer(null);
      setNotFound(true);
      setError(null);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function load(farmerId: string) {
      setLoading(true);
      setError(null);
      setNotFound(false);

      const { data, error } = await supabase
        .from("farmers")
        .select("*, barangay:barangays(name)")
        .eq("id", farmerId)
        .is("deleted_at", null)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        setError(error.message);
        setFarmer(null);
      } else if (!data) {
        setNotFound(true);
        setFarmer(null);
      } else {
        setFarmer(data as FarmerDetails);
      }
      setLoading(false);
    }

    load(id);

    return () => {
      cancelled = true;
    };
  }, [id, reloadCount]);

  return { farmer, loading, error, notFound, reload };
}

// src/hooks/useFarmers.ts
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Farmer } from "../types/farmer";
import type { StatusFilterValue } from "../components/farmers/FarmerStatusFilter";
import type { BarangayFilterValue } from "../components/farmers/FarmerBarangayFilter";

const SEARCH_DELAY_MS = 300;
const PAGE_LIMIT = 100;

interface Filters {
  search: string;
  status: StatusFilterValue;
  barangayId: BarangayFilterValue;
}

// Commas and parentheses would break the PostgREST "or" filter string.
function cleanSearch(text: string): string {
  return text.replace(/[,()%*]/g, " ").trim();
}

export function useFarmers({ search, status, barangayId }: Filters) {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Wait until the user stops typing before querying.
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), SEARCH_DELAY_MS);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      let query = supabase
        .from("farmers")
        .select("*")
        .is("deleted_at", null)
        .order("last_name", { ascending: true })
        .order("first_name", { ascending: true })
        .limit(PAGE_LIMIT);

      if (status !== "all") {
        query = query.eq("status", status);
      }

      if (barangayId !== "all") {
        query = query.eq("barangay_id", barangayId);
      }

      const text = cleanSearch(debouncedSearch);
      if (text) {
        const conditions = [
          `first_name.ilike.%${text}%`,
          `middle_name.ilike.%${text}%`,
          `last_name.ilike.%${text}%`,
          `rsbsa_id.ilike.%${text}%`,
        ];
        // farmer_number is a number column, so it only supports exact match.
        if (/^\d+$/.test(text)) {
          conditions.push(`farmer_number.eq.${text}`);
        }
        query = query.or(conditions.join(","));
      }

      const { data, error } = await query;

      if (cancelled) return;

      if (error) {
        setError(error.message);
        setFarmers([]);
      } else {
        setFarmers((data ?? []) as Farmer[]);
      }
      setLoading(false);
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [debouncedSearch, status, barangayId]);

  return { farmers, loading, error };
}

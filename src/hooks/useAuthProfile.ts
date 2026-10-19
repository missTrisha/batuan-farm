// src/hooks/useAuthProfile.ts
import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import type { Role } from "../components/layout/navItems";

export type Profile = {
  id: string;
  email: string;
  display_name: string;
  role: Role;
  is_active: boolean;
  avatar_path: string | null;
};

export function useAuthProfile() {
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);
  const [loaded, setLoaded] = useState<Profile | null>(null);
  const [failedFor, setFailedFor] = useState<string | null>(null);

  // Track the signed-in session
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => setSession(newSession),
    );
    return () => listener.subscription.unsubscribe();
  }, []);

  const userId = session?.user.id ?? null;

  // Load the profile of the signed-in user
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;

    supabase
      .from("profiles")
      .select("id, email, display_name, role, is_active, avatar_path")
      .eq("id", userId)
      .single()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error || !data || !data.is_active) {
          setFailedFor(userId);
          return;
        }
        setLoaded(data as Profile);
      });

    return () => {
      cancelled = true;
    };
  }, [userId]);

  // Update the in-memory profile after a successful save (name, picture)
  const patchProfile = useCallback((patch: Partial<Profile>) => {
    setLoaded((prev) => (prev ? { ...prev, ...patch } : prev));
  }, []);

  const profile = loaded && loaded.id === userId ? loaded : null;
  const profileFailed = !!userId && failedFor === userId;

  return {
    checking, // still checking for a saved session
    session,
    profile,
    profileFailed, // no profile found, or the account is deactivated
    loadingProfile: !!userId && !profile && !profileFailed,
    patchProfile, // merge saved changes into the profile without refetching
  };
}

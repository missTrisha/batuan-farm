// src/components/auth/NoAccess.tsx
import { supabase } from "../../lib/supabase";
import Button from "../ui/Button";

export default function NoAccess() {
  return (
    <div className="grid min-h-screen place-items-center bg-page p-4">
      <div className="w-full max-w-md rounded-3xl bg-surface p-8 text-center shadow-card">
        <h1 className="font-serif text-3xl font-bold text-ink">No access</h1>
        <p className="mt-2 text-muted">
          This account has no active profile. Please contact the Municipal
          Agriculture Office.
        </p>
        <Button
          className="mt-6 h-12 w-full"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}

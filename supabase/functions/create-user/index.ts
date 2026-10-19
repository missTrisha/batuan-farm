// supabase/functions/create-user/index.ts
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const ROLES = ["mao", "agriculture_worker"];
const MIN_PASSWORD = 8;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return json({ error: "Method not allowed." }, 405);
  }

  // Admin client (service role). These env vars are provided automatically.
  const admin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  // 1. Who is calling?
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return json({ error: "Not signed in." }, 401);

  const { data: userData, error: userError } = await admin.auth.getUser(token);
  if (userError || !userData.user) {
    return json({ error: "Not signed in." }, 401);
  }

  // 2. The caller must be an active MAO
  const { data: caller } = await admin
    .from("profiles")
    .select("role, is_active")
    .eq("id", userData.user.id)
    .single();

  if (!caller || caller.role !== "mao" || !caller.is_active) {
    return json({ error: "Only an active MAO can create accounts." }, 403);
  }

  // 3. Read and validate the request
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");
  const displayName = String(body.display_name ?? "").trim();
  const role = String(body.role ?? "");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "Enter a valid email address." }, 400);
  }
  if (password.length < MIN_PASSWORD) {
    return json(
      { error: `Password must be at least ${MIN_PASSWORD} characters.` },
      400,
    );
  }
  if (!displayName || displayName.length > 60) {
    return json({ error: "Display name must be 1 to 60 characters." }, 400);
  }
  if (!ROLES.includes(role)) {
    return json({ error: "Invalid role." }, 400);
  }

  // 4. Create the login
  const { data: created, error: createError } =
    await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { display_name: displayName, role },
    });

  if (createError || !created.user) {
    const exists = createError?.message?.toLowerCase().includes("already");
    return json(
      {
        error: exists
          ? "An account with this email already exists."
          : (createError?.message ?? "Could not create the account."),
      },
      exists ? 409 : 400,
    );
  }

  // 5. Create (or complete) the profile row
  const { error: profileError } = await admin.from("profiles").upsert({
    id: created.user.id,
    email,
    display_name: displayName,
    role,
    is_active: true,
  });

  if (profileError) {
    // Roll back so we don't leave a login without a profile
    await admin.auth.admin.deleteUser(created.user.id);
    return json({ error: "Could not create the profile." }, 500);
  }

  return json({ id: created.user.id });
});
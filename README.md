# Batuan Agri-Input Distribution System

A web-based, offline-capable system for managing the distribution of free agricultural inputs (seeds and fertilizer) to registered farmers in the Municipality of Batuan, Masbate. It is built for the Municipal Agriculture Office (MAO) and the Local Government Unit (LGU), and began as a BSCS thesis project at Osmeña Colleges.

## Overview

The system replaces paper logbooks with a single record of farmers, finalist lists, distribution rounds, and claims. Agriculture Workers do the field work, including registration, verification and claim recording. The MAO monitors records, resolves conflicts, and manages accounts.

It is a Progressive Web App (PWA). Farmer registration and claim recording keep working without internet or during brownouts, then sync when a connection returns. Everything else is online-only.

## Features

- **Farmer records:** profiling, verification and approval before any claim. Records stay after claiming, so workers can see who has and has not been served.
- **Two farmer IDs:** an auto-generated ID, plus an optional existing-ID field (unique, nullable, editable) for farmers already listed in the MAO logbook.
- **Parcels:** land and crop details live inside the farmer profile.
- **Distribution by rounds:** the agricultural office provides a finalist list. Unserved farmers receive in the next round, and the cycle repeats once everyone has been served. The MAO can change the finalist list after it is finalized.
- **Claim recording:** the Farmer ID and name are shown at distribution. Claims work offline and sync later.
- **Conflict resolution:** conflicting claims are resolved by the MAO worker, and MAO managers have the final decision.
- **Inventory:** stock of inputs received from the agriculture office, and what has been released.
- **Reports and notifications:** summaries by barangay and round, and in-app alerts.
- **Audit logs:** system-owned trail of important actions, visible to the MAO only.
- **My Account:** profile picture (JPG, PNG or WebP, max 2 MB), display name, and password change.

## User Roles

| Role                   | Access                                                                                  |
| ---------------------- | --------------------------------------------------------------------------------------- |
| **MAO (admin)**        | Views all records, manages users, finalizes lists, resolves conflicts, reads audit logs |
| **Agriculture Worker** | Registers and updates farmers, records claims; no Settings access                       |

There is no public sign-up. The login form takes only an email and password. An MAO creates every account.

**User management rules**

- An MAO can create other MAO accounts, and can promote or demote workers.
- An MAO can activate or deactivate accounts. A deactivated user sees a "No access" screen at login.
- No one can change their own role, status or email, which includes MAOs. They can change only their own display name, picture and password.

## Tech Stack

| Layer           | Technology                                              |
| --------------- | ------------------------------------------------------- |
| Frontend        | React, TypeScript, Vite, Tailwind CSS                   |
| PWA and offline | vite-plugin-pwa, IndexedDB with Dexie.js                |
| Backend         | Supabase (PostgreSQL 17, Auth, Storage, Edge Functions) |
| Hosting         | Cloudflare Pages with continuous deployment from GitHub |

## Architecture Notes

- All primary keys are UUIDs. The app generates UUID v7 on the client, which keeps offline-created records conflict-free. The database default is `gen_random_uuid()`.
- Barangays are stored as a plain name column, not a separate table.
- The sidebar uses dropdown groups (Distribution, Inventory, Settings). Settings splits into User Management and Audit Logs, and is hidden from workers.
- Components are small and reusable (for example `SidebarGroup`, `SidebarSubLink`, `AvatarUploader`, `DisplayNameForm`).

## Security

- **Row Level Security** is enabled on all tables.
- `is_mao()` is a `security definer` function that checks the caller is an active MAO.
- The `profiles` table lets an MAO read, insert and update all rows. Everyone else can read and update only their own row.
- The `protect_own_profile` trigger rejects any attempt to change one's own role, status or email.
- Account creation runs in a Supabase Edge Function, so the secret key never reaches the browser.
- Avatars are stored in a private 2 MB bucket.
- Writes verify that a row came back, so a blocked update shows an error instead of a false "Saved".

## Project Structure

```
src/
  components/   reusable UI (ui/, account/, sidebar/, ...)
  hooks/        shared hooks (for example useAvatarUrl)
  lib/          supabase client, offline (Dexie) setup
  pages/        one page per sidebar route
  routes/       route guards and role checks
supabase/
  functions/    create-user Edge Function
```

## Getting Started

**Requirements:** Node.js 18 or newer, and a Supabase project.

```bash
git clone <repository-url>
cd batuan-farm
npm install
```

Create a `.env` file in the project root:

```bash
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-or-publishable-key
```

Run the app:

```bash
npm run dev       # development server at http://localhost:5173
npm run build     # production build
npm run preview   # preview the production build
```

Never put the Supabase secret or service key in the frontend or in `.env`.

## Supabase Setup

1. Create a new Supabase project.
2. Run the SQL for the tables, RLS policies, `is_mao()` and `protect_own_profile`.
3. Create the private `avatars` bucket (2 MB limit) in the dashboard.
4. Deploy the `create-user` Edge Function.
5. Create the first MAO account manually, then create the rest from the app.

## Deployment

Cloudflare Pages deploys from the GitHub repository on every push.

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Environment variables:** `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` only

## Credits

Developed for the MAO and LGU of Batuan, Masbate, as a thesis system by BSCS students of Osmeña Colleges.

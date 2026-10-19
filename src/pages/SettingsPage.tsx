// src/pages/SettingsPage.tsx
import { useState } from "react";
import type { ReactNode } from "react";
import CreateUserForm from "../components/settings/CreateUserForm";
import UsersTable from "../components/settings/UsersTable";

type SettingsPageProps = {
  currentUserId: string;
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-surface p-6 shadow-card">
      <h2 className="mb-4 text-base font-bold text-ink">{title}</h2>
      {children}
    </section>
  );
}

export default function SettingsPage({ currentUserId }: SettingsPageProps) {
  // Bumping this number makes the users list reload
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold text-ink">Settings</h1>

      <Section title="Create account">
        <CreateUserForm onCreated={() => setRefreshKey((k) => k + 1)} />
      </Section>

      <Section title="Users">
        <UsersTable currentUserId={currentUserId} refreshKey={refreshKey} />
      </Section>
    </div>
  );
}

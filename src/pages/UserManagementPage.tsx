// src/pages/UserManagementPage.tsx
import { useState } from "react";
import Section from "../components/ui/Section";
import CreateUserForm from "../components/settings/CreateUserForm";
import UsersTable from "../components/settings/UsersTable";
import UserActions from "../components/settings/UserActions";

type UserManagementPageProps = {
  currentUserId: string;
};

export default function UserManagementPage({
  currentUserId,
}: UserManagementPageProps) {
  // Bumping this number makes the users list reload
  const [refreshKey, setRefreshKey] = useState(0);
  const reload = () => setRefreshKey((k) => k + 1);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Section title="Create account">
        <CreateUserForm onCreated={reload} />
      </Section>

      <Section title="Users">
        <UsersTable
          currentUserId={currentUserId}
          refreshKey={refreshKey}
          renderActions={(user) =>
            // An MAO cannot change their own role or active status
            user.id === currentUserId ? null : (
              <UserActions user={user} onChanged={reload} />
            )
          }
        />
      </Section>
    </div>
  );
}

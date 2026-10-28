// src/pages/AccountPage.tsx
import type { ReactNode } from "react";
import type { Profile } from "../hooks/useAuthProfile";
import AvatarUploader from "../components/AvatarUploader";
import DisplayNameForm from "../components/account/DisplayNameForm";
import PasswordForm from "../components/account/PasswordForm";

type AccountPageProps = {
  profile: Profile;
  onProfileChange: (patch: Partial<Profile>) => void;
};

function Section({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-line bg-surface p-6 shadow-card ${className}`}
    >
      <h2 className="mb-4 text-base font-bold text-ink">{title}</h2>
      {children}
    </section>
  );
}

export default function AccountPage({
  profile,
  onProfileChange,
}: AccountPageProps) {
  return (
    <div className="mx-auto grid max-w-5xl gap-6 lg:auto-rows-fr lg:grid-cols-2">
      <Section title="Profile picture">
        <AvatarUploader
          userId={profile.id}
          displayName={profile.display_name}
          avatarPath={profile.avatar_path}
          onChange={(newPath) => onProfileChange({ avatar_path: newPath })}
        />
      </Section>

      <Section title="Display name">
        <DisplayNameForm
          userId={profile.id}
          currentName={profile.display_name}
          onSaved={(newName) => onProfileChange({ display_name: newName })}
        />
      </Section>

      {/* Right column on desktop, spans both rows */}
      <Section
        title="Change password"
        className="lg:col-start-2 lg:row-span-2 lg:row-start-1"
      >
        <PasswordForm email={profile.email} />
      </Section>
    </div>
  );
}

// // src/pages/AccountPage.tsx
// import type { ReactNode } from "react";
// import type { Profile } from "../hooks/useAuthProfile";
// import AvatarUploader from "../components/AvatarUploader";
// import DisplayNameForm from "../components/account/DisplayNameForm";
// import PasswordForm from "../components/account/PasswordForm";

// type AccountPageProps = {
//   profile: Profile;
//   onProfileChange: (patch: Partial<Profile>) => void;
// };

// function Section({ title, children }: { title: string; children: ReactNode }) {
//   return (
//     <section className="rounded-2xl border border-line bg-surface p-6 shadow-card">
//       <h2 className="mb-4 text-base font-bold text-ink">{title}</h2>
//       {children}
//     </section>
//   );
// }

// export default function AccountPage({
//   profile,
//   onProfileChange,
// }: AccountPageProps) {
//   return (
//     <div className="mx-auto max-w-2xl space-y-6">
//       <Section title="Profile picture">
//         <AvatarUploader
//           userId={profile.id}
//           displayName={profile.display_name}
//           avatarPath={profile.avatar_path}
//           onChange={(newPath) => onProfileChange({ avatar_path: newPath })}
//         />
//       </Section>

//       <Section title="Display name">
//         <DisplayNameForm
//           userId={profile.id}
//           currentName={profile.display_name}
//           onSaved={(newName) => onProfileChange({ display_name: newName })}
//         />
//       </Section>

//       <Section title="Change password">
//         <PasswordForm email={profile.email} />
//       </Section>
//     </div>
//   );
// }

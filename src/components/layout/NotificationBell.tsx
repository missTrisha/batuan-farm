// src/components/layout/NotificationBell.tsx
import { Link } from "react-router-dom";
import { FiBell } from "react-icons/fi";

type NotificationBellProps = {
  count?: number; // unread notifications, 0 hides the badge
};

export default function NotificationBell({ count = 0 }: NotificationBellProps) {
  const label = count > 0 ? `Notifications, ${count} unread` : "Notifications";

  return (
    <Link
      to="/notifications"
      aria-label={label}
      className="relative grid h-11 w-11 place-items-center rounded-xl text-ink transition hover:bg-primary/10"
    >
      <FiBell className="text-xl" />

      {count > 0 && (
        <span className="absolute right-1.5 top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-danger px-1 text-[0.65rem] font-bold leading-none text-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}

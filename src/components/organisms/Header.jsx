import TextLogo from '../atoms/TextLogo'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { ROLES } from '../../lib/roles';
export default function Header() {
  const { user, logout } = useAuth();
  const profilePath =
    user?.role === ROLES.BRAND
      ? "/app/profile"
      : "/app/profile";

  return (
    <header className="sticky top-0 z-40 h-[var(--header-height)] bg-white/80 dark:bg-gray-950/80 backdrop-blur border-b border-gray-100 dark:border-gray-800 z-50 shadow-sm">
      <div className="container-px flex h-full items-center justify-between">
        <TextLogo />
        <div className="flex items-center gap-3">
          <Link className="btn btn-ghost" to={profilePath}>
            👤 Profile
          </Link>
          <Link className="btn btn-ghost" to="/app/settings">
            ⚙️ Settings
          </Link>
          <Link className="btn btn-ghost" to="/app/notifications">
            🔔 Notifications
          </Link>
          <button className="btn btn-primary" onClick={logout}>
            🚪 Logout
          </button>
        </div>
      </div>
    </header>
  );
}

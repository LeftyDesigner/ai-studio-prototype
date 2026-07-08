import { NavLink } from 'react-router-dom';
import {
  IconDashboard,
  IconAgents,
  IconTemplates,
  IconSkills,
  IconTools,
  IconPlayground,
  IconAudit,
} from '../icons';
import './SideNav.css';

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: IconDashboard },
  { to: '/agents', label: 'Agents', icon: IconAgents },
  { to: '/templates', label: 'Templates', icon: IconTemplates },
  { to: '/skills', label: 'Skills', icon: IconSkills },
  { to: '/tools', label: 'Tools', icon: IconTools },
  { to: '/playground', label: 'Playground', icon: IconPlayground },
  { to: '/audit', label: 'Audit', icon: IconAudit },
];

export function SideNav() {
  return (
    <nav className="side-nav" aria-label="Primary">
      <ul className="side-nav__list">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) => `side-nav__link${isActive ? ' is-active' : ''}`}
            >
              <span className="side-nav__icon">
                <Icon />
              </span>
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

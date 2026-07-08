import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { IconUser } from '../icons';
import './Header.css';

export function Header() {
  return (
    <header className="app-header">
      <Link to="/dashboard" className="app-header__brand">
        <Logo />
        <div className="app-header__titles">
          <span className="app-header__title">AI Studio</span>
        </div>
      </Link>
      <div className="app-header__spacer" />
      <div className="app-header__context">
        <span className="app-header__avatar">
          <IconUser width={20} height={20} />
        </span>
      </div>
    </header>
  );
}

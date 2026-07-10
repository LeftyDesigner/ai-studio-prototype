import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { IconUser } from '../icons';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  function handleLogout() {
    setMenuOpen(false);
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <header className="app-header">
      <Link to="/dashboard" className="app-header__brand">
        <Logo />
        <div className="app-header__titles">
          <span className="app-header__title">AI Studio</span>
        </div>
      </Link>
      <div className="app-header__spacer" />
      <div className="app-header__context" ref={menuRef}>
        <button
          type="button"
          className="app-header__avatar"
          onClick={() => setMenuOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
        >
          <IconUser width={20} height={20} />
        </button>
        {menuOpen && (
          <div className="app-header__menu" role="menu">
            {user && <div className="app-header__menu-user">{user}</div>}
            <button type="button" className="app-header__menu-item" onClick={handleLogout} role="menuitem">
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

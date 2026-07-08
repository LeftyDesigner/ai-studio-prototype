import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './Toolbar.css';

interface ToolbarProps {
  children: ReactNode;
}

/** Full-width action bar shown underneath a page header, e.g. "Match tuning" toolbar in the ODS. */
export function Toolbar({ children }: ToolbarProps) {
  return (
    <div className="toolbar">
      <div className="toolbar__group">{children}</div>
    </div>
  );
}

interface ToolbarActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
}

/** Icon-over-label action button used inside a Toolbar. */
export function ToolbarAction({ icon, label, className, ...rest }: ToolbarActionProps) {
  return (
    <button type="button" className={`toolbar__action${className ? ` ${className}` : ''}`} {...rest}>
      <span className="toolbar__icon">{icon}</span>
      <span className="toolbar__label">{label}</span>
    </button>
  );
}

/** Icon-over-label action link used inside a Toolbar. */
export function ToolbarLinkAction({ icon, label, to }: { icon: ReactNode; label: string; to: string }) {
  return (
    <Link to={to} className="toolbar__action">
      <span className="toolbar__icon">{icon}</span>
      <span className="toolbar__label">{label}</span>
    </Link>
  );
}

export function ToolbarSeparator() {
  return <span className="toolbar__separator" aria-hidden="true" />;
}

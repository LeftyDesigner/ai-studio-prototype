import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'md' | 'sm';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

export function Button({ variant = 'secondary', size = 'md', className, children, ...rest }: ButtonProps) {
  const cls = `btn btn--${variant}${size === 'sm' ? ' btn--sm' : ''}${className ? ` ${className}` : ''}`;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

export function LinkButton({
  to,
  variant = 'secondary',
  size = 'md',
  children,
}: {
  to: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}) {
  const cls = `btn btn--${variant}${size === 'sm' ? ' btn--sm' : ''}`;
  return (
    <Link to={to} className={cls}>
      {children}
    </Link>
  );
}

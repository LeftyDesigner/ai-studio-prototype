import type { ReactNode } from 'react';
import './Pill.css';

type PillTone = 'default' | 'ok' | 'error' | 'info' | 'warn';

export function Pill({ tone = 'default', children }: { tone?: PillTone; children: ReactNode }) {
  return <span className={`pill pill--${tone}`}>{children}</span>;
}

export function TagChip({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'skill' }) {
  return <span className={`tag-chip tag-chip--${tone}`}>{children}</span>;
}

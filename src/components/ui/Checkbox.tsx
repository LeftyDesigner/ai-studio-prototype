import { useEffect, useRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import './Checkbox.css';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'checked' | 'onChange'> {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
}

/** Small square selection control matching the Instrument Design System's Checkbox 2.0. */
export function Checkbox({ checked, indeterminate = false, onChange, className, ...rest }: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <input
      ref={ref}
      type="checkbox"
      className={`checkbox${className ? ` ${className}` : ''}`}
      checked={checked}
      onChange={onChange}
      onClick={(e) => e.stopPropagation()}
      {...rest}
    />
  );
}

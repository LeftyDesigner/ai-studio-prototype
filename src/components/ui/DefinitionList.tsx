import type { ReactNode } from 'react';
import './DefinitionList.css';

export function DefinitionList({ items }: { items: { label: string; value: ReactNode }[] }) {
  return (
    <table className="def-list">
      <tbody>
        {items.map((item) => (
          <tr key={item.label}>
            <td>{item.label}</td>
            <td>{item.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

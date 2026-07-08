import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox } from './Checkbox';
import { IconInfo } from '../icons';
import './Table.css';

export interface Column<T> {
  key: string;
  header: string;
  align?: 'left' | 'right';
  render: (row: T) => ReactNode;
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
  footer?: ReactNode;
  emptyMessage?: string;
  /** Adds a checkbox column and a header "select all" checkbox. */
  selectable?: boolean;
  selectedKeys?: string[];
  onSelectedKeysChange?: (keys: string[]) => void;
  /** When provided (together with `selectable`), reveals an info-icon link on row hover. */
  detailHref?: (row: T) => string;
}

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  onRowClick,
  footer,
  emptyMessage = 'No items to show.',
  selectable = false,
  selectedKeys = [],
  onSelectedKeysChange,
  detailHref,
}: DataTableProps<T>) {
  const selectedSet = new Set(selectedKeys);
  const allKeys = rows.map(rowKey);
  const allSelected = allKeys.length > 0 && allKeys.every((k) => selectedSet.has(k));
  const someSelected = !allSelected && allKeys.some((k) => selectedSet.has(k));

  const toggleAll = () => {
    onSelectedKeysChange?.(allSelected ? [] : allKeys);
  };

  const toggleOne = (key: string) => {
    if (!onSelectedKeysChange) return;
    onSelectedKeysChange(
      selectedSet.has(key) ? selectedKeys.filter((k) => k !== key) : [...selectedKeys, key],
    );
  };

  return (
    <div className="data-table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {selectable && (
              <th className="select-col">
                <Checkbox checked={allSelected} indeterminate={someSelected} onChange={toggleAll} aria-label="Select all rows" />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                className={col.align === 'right' ? 'align-right' : undefined}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const key = rowKey(row);
            const isSelected = selectedSet.has(key);
            return (
              <tr
                key={key}
                className={[onRowClick ? 'is-clickable' : '', isSelected ? 'is-selected' : ''].filter(Boolean).join(' ') || undefined}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
              >
                {selectable && (
                  <td className="select-col">
                    <div className="row-select-cell">
                      <Checkbox checked={isSelected} onChange={() => toggleOne(key)} aria-label="Select row" />
                      {detailHref && (
                        <Link
                          to={detailHref(row)}
                          className="row-detail-link"
                          aria-label="View details"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <IconInfo width={16} height={16} />
                        </Link>
                      )}
                    </div>
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className={col.align === 'right' ? 'align-right' : undefined}>
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {rows.length === 0 && <div className="data-table-empty">{emptyMessage}</div>}
      {footer && <div className="data-table-footer">{footer}</div>}
    </div>
  );
}

export function EntityCell({
  icon,
  name,
  meta,
  color = 'slate',
}: {
  icon: ReactNode;
  name: string;
  meta?: string;
  color?: 'teal' | 'slate' | 'violet' | 'amber';
}) {
  return (
    <div className="cell-primary">
      <span className={`cell-avatar ${color}`}>{icon}</span>
      <div>
        <div className="cell-primary__name">{name}</div>
        {meta && <div className="cell-primary__meta">{meta}</div>}
      </div>
    </div>
  );
}

export function DescriptionCell({ text }: { text: string }) {
  return <div className="cell-description">{text}</div>;
}

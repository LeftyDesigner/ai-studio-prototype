export interface ActivityDay {
  date: string;
  ok: number;
  failed: number;
}

// Sparse run activity across the observed window (mirrors the source
// dashboard's mostly-empty 06-08 -> 07-07 activity strip, with a small
// cluster of completed runs).
export const activity: ActivityDay[] = (() => {
  const days: ActivityDay[] = [];
  const start = new Date('2026-06-08T00:00:00Z');
  for (let i = 0; i < 30; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push({ date: d.toISOString().slice(0, 10), ok: 0, failed: 0 });
  }
  // 2026-06-26 had the three recorded runs
  const idx = days.findIndex((d) => d.date === '2026-06-26');
  if (idx >= 0) days[idx].ok = 3;
  return days;
})();

export const periodOptions = [
  { value: 7, label: '7 days' },
  { value: 14, label: '14 days' },
  { value: 30, label: '1 month' },
  { value: 90, label: '3 months' },
  { value: 365, label: '1 year' },
];

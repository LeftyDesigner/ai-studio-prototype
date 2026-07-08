import type { ActivityDay } from '../../data/dashboard';
import './ActivityChart.css';

export function ActivityChart({ days }: { days: ActivityDay[] }) {
  const max = Math.max(1, ...days.map((d) => d.ok + d.failed));
  const barWidth = 1000 / days.length;

  return (
    <div className="activity-chart card">
      <svg viewBox="0 0 1000 130" preserveAspectRatio="none" className="activity-chart__svg">
        <line x1="0" y1="110" x2="1000" y2="110" stroke="var(--color-border-default)" strokeWidth="1" />
        {days.map((d, i) => {
          const total = d.ok + d.failed;
          const h = total === 0 ? 2 : (total / max) * 90;
          const x = i * barWidth + barWidth * 0.2;
          const w = barWidth * 0.6;
          const color = d.failed > 0 ? 'var(--color-status-err-text)' : total > 0 ? 'var(--color-status-ok-text)' : 'var(--color-bg-base-300)';
          return (
            <rect
              key={d.date}
              x={x}
              y={110 - h}
              width={w}
              height={h}
              rx={1.5}
              fill={color}
            >
              <title>
                {d.date}: {d.ok} ok, {d.failed} failed
              </title>
            </rect>
          );
        })}
      </svg>
      <div className="activity-chart__legend">
        <span className="activity-chart__legend-item">
          <span className="dot ok" /> ok
        </span>
        <span className="activity-chart__legend-item">
          <span className="dot failed" /> failed
        </span>
        <span className="activity-chart__range muted">
          {days[0]?.date.slice(5)} → {days[days.length - 1]?.date.slice(5)}
        </span>
      </div>
    </div>
  );
}

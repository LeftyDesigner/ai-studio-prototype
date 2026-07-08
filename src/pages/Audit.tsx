import { Link } from 'react-router-dom';
import { DataTable } from '../components/ui/Table';
import { Pill } from '../components/ui/Pill';
import { runs } from '../data/runs';

export function Audit() {
  const sorted = [...runs].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Audit</h2>
          <p className="page-subtitle">
            Platform-wide agent run history. Source is the agent; User is the customer or tenant context on the
            run.
          </p>
        </div>
      </div>

      <DataTable
        columns={[
          {
            key: 'type',
            header: 'Type',
            render: (r) => (
              <Link to={`/agents/${r.agentId}`} style={{ textDecoration: 'none' }}>
                <Pill tone={r.status === 'completed' ? 'ok' : r.status === 'failed' ? 'error' : 'info'}>
                  Run - {r.status}
                </Pill>
              </Link>
            ),
          },
          { key: 'date', header: 'Date', render: (r) => <span className="muted">{r.date}</span> },
          {
            key: 'source',
            header: 'Source',
            render: (r) => <Link to={`/agents/${r.agentId}`}>{r.agentName}</Link>,
          },
          { key: 'user', header: 'User', render: (r) => r.user },
          { key: 'model', header: 'Model', render: (r) => <code className="muted">{r.model}</code> },
          { key: 'credits', header: 'Credits', align: 'right', render: (r) => r.credits },
        ]}
        rows={sorted}
        rowKey={(r) => r.id}
      />
    </div>
  );
}

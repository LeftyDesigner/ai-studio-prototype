import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MetricCard, Card } from '../components/ui/MetricCard';
import { DataTable, EntityCell } from '../components/ui/Table';
import { ActivityChart } from '../components/ui/ActivityChart';
import { IconTools } from '../components/icons';
import { agents } from '../data/agents';
import { runs } from '../data/runs';
import { activity, periodOptions } from '../data/dashboard';
import { toolkits } from '../data/tools';
import '../components/ui/Card.css';

export function Dashboard() {
  const [period, setPeriod] = useState(30);

  const totalRuns = runs.length;
  const succeeded = runs.filter((r) => r.status === 'completed').length;
  const failed = runs.filter((r) => r.status === 'failed').length;
  const totalTokens = runs.reduce((sum, r) => sum + r.tokensTotal, 0);
  const avgLatency = Math.round(runs.reduce((sum, r) => sum + r.durationMs, 0) / (runs.length || 1));
  const modelsUsed = new Set(agents.map((a) => a.model)).size;

  const agentUsage = useMemo(() => {
    return agents
      .map((agent) => {
        const agentRuns = runs.filter((r) => r.agentId === agent.id);
        const tokens = agentRuns.reduce((sum, r) => sum + r.tokensTotal, 0);
        return { agent, runCount: agentRuns.length, tokens };
      })
      .filter((a) => a.runCount > 0)
      .sort((a, b) => b.tokens - a.tokens);
  }, []);

  const totalUsageTokens = agentUsage.reduce((sum, a) => sum + a.tokens, 0);

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Observability Dashboard</h2>
          <p className="page-subtitle">
            Platform-wide usage metrics and activity monitoring. Aggregated from agent run history.
          </p>
        </div>
        <div className="page-header__actions">
          <span className="muted" style={{ fontSize: 13 }}>
            Period
          </span>
          <select
            className="field__control"
            value={period}
            onChange={(e) => setPeriod(Number(e.target.value))}
            style={{ width: 'auto' }}
          >
            {periodOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="metrics-grid">
        <MetricCard
          label="Total Runs"
          value={totalRuns}
          sub={
            <>
              <span className="ok">{succeeded} succeeded</span>
              <span className="err">{failed} failed</span>
            </>
          }
        />
        <MetricCard label="Total Tokens" value={totalTokens.toLocaleString()} sub="all time" />
        <MetricCard label="Avg Latency" value={`${avgLatency}ms`} sub="per completed run" />
        <MetricCard
          label="Active Agents"
          value={agents.length}
          sub={`${modelsUsed} model(s) used`}
        />
      </div>

      <div className="grid-2" style={{ marginTop: 24 }}>
        <div>
          <h4 className="section-title">Agent Usage</h4>
          <DataTable
            columns={[
              {
                key: 'agent',
                header: 'Agent',
                render: (row) => (
                  <Link to={`/agents/${row.agent.id}`} style={{ textDecoration: 'none' }}>
                    {row.agent.name}
                  </Link>
                ),
              },
              { key: 'runs', header: 'Runs', align: 'right', render: (row) => row.runCount },
              { key: 'tokens', header: 'Tokens', align: 'right', render: (row) => row.tokens.toLocaleString() },
              {
                key: 'pct',
                header: '% of Total',
                align: 'right',
                render: (row) =>
                  totalUsageTokens ? `${Math.round((row.tokens / totalUsageTokens) * 100)}%` : '0%',
              },
            ]}
            rows={agentUsage}
            rowKey={(row) => row.agent.id}
          />
        </div>

        <div>
          <h4 className="section-title">Run Activity</h4>
          <ActivityChart days={activity} />

          <h4 className="section-title" style={{ marginTop: 24 }}>
            Connected Tools
          </h4>
          <Card>
            {toolkits.length === 0 ? (
              <span className="muted">No toolkits registered.</span>
            ) : (
              <DataTable
                columns={[
                  {
                    key: 'toolkit',
                    header: 'Toolkit',
                    render: (t) => (
                      <EntityCell icon={<IconTools />} name={t.id} meta={t.transport} color="teal" />
                    ),
                  },
                  { key: 'tools', header: 'Tools', align: 'right', render: (t) => t.tools.length },
                ]}
                rows={toolkits}
                rowKey={(t) => t.id}
              />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

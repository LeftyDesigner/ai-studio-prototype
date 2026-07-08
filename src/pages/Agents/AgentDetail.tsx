import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAgentById } from '../../data/agents';
import { getRunsForAgent } from '../../data/runs';
import { Tabs } from '../../components/ui/Tabs';
import { DefinitionList } from '../../components/ui/DefinitionList';
import { TagChip } from '../../components/ui/Pill';
import { Button } from '../../components/ui/Button';
import { DataTable } from '../../components/ui/Table';
import { Pill } from '../../components/ui/Pill';
import { IconAgentAvatar, IconArrowLeft, IconPencil, IconBin } from '../../components/icons';
import './AgentDetail.css';

const tabs = [
  { key: 'definition', label: 'Agent Definition' },
  { key: 'activation', label: 'Activation' },
  { key: 'run', label: 'Run Agent and Conversations' },
  { key: 'history', label: 'Runs & history' },
];

export function AgentDetail() {
  const { agentId } = useParams<{ agentId: string }>();
  const [active, setActive] = useState('definition');
  const [message, setMessage] = useState('');
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);

  const agent = agentId ? getAgentById(agentId) : undefined;

  if (!agent) {
    return (
      <div>
        <Link to="/agents" className="back-bar">
          <span className="back-bar__icon">
            <IconArrowLeft width={16} height={16} />
          </span>
          Back to agents
        </Link>
        <p>Agent not found.</p>
      </div>
    );
  }

  const agentRuns = getRunsForAgent(agent.id);

  function handleRun() {
    if (!message.trim() || !agent) return;
    setRunning(true);
    setOutput(null);
    window.setTimeout(() => {
      setOutput(
        `Simulated response from "${agent.name}" (${agent.model}).\n\nThis prototype does not call a live model — wire this panel up to your agent-runtime endpoint to see real completions.\n\nYou asked: "${message.trim()}"`,
      );
      setRunning(false);
    }, 900);
  }

  return (
    <div>
      <Link to="/agents" className="back-bar">
        <span className="back-bar__icon">
          <IconArrowLeft width={16} height={16} />
        </span>
        Back to agents
      </Link>

      <div className="detail-header">
        <div className={`detail-header__avatar ${agent.avatarColor}`}>
          <IconAgentAvatar width={22} height={22} />
        </div>
        <div>
          <h1 className="page-title" style={{ fontSize: 22 }}>
            Agent Details – {agent.name}
          </h1>
          <div className="detail-header__meta">
            <span>{agent.template}</span>
            <span>·</span>
            <span>
              env <Pill>{agent.environment}</Pill>
            </span>
            <span>·</span>
            <span>
              id <code>{agent.id}</code>
            </span>
          </div>
        </div>
        <div className="detail-header__actions">
          <Button variant="secondary">
            <IconPencil width={14} height={14} /> Edit
          </Button>
          <Button variant="danger">
            <IconBin width={14} height={14} /> Delete
          </Button>
        </div>
      </div>

      <Tabs tabs={tabs} active={active} onChange={setActive} />

      {active === 'definition' && (
        <div>
          <p className="muted" style={{ marginBottom: 12 }}>
            {agent.description}
          </p>
          <DefinitionList
            items={[
              { label: 'Version', value: agent.version },
              {
                label: 'Model',
                value: (
                  <>
                    <code>{agent.model}</code> <span className="muted">via {agent.provider}</span>
                  </>
                ),
              },
              { label: 'Temperature', value: agent.temperature ?? '—' },
              { label: 'Max tokens', value: agent.maxTokens ?? '—' },
              { label: 'Template', value: agent.template },
              { label: 'Environment', value: <Pill>{agent.environment}</Pill> },
              { label: 'Customer', value: agent.customer },
              { label: 'Trigger', value: <Pill>{agent.trigger}</Pill> },
              {
                label: 'Memory',
                value: agent.memoryEnabled ? (
                  <Pill tone="info">On ({agent.memoryWindow} msgs)</Pill>
                ) : (
                  <Pill>Off</Pill>
                ),
              },
            ]}
          />

          <h6 className="section-title" style={{ fontSize: 13, textTransform: 'uppercase', color: 'var(--color-text-subtle)' }}>
            System prompt
          </h6>
          <pre className="system-prompt">{agent.systemPrompt}</pre>

          <h6 className="section-title" style={{ fontSize: 13, textTransform: 'uppercase', color: 'var(--color-text-subtle)' }}>
            Bound tools
          </h6>
          <div className="chip-row">
            {agent.boundTools.length === 0 ? (
              <span className="muted">No tools bound.</span>
            ) : (
              agent.boundTools.map((t) => <TagChip key={t}>{t}</TagChip>)
            )}
          </div>

          <h6 className="section-title" style={{ fontSize: 13, textTransform: 'uppercase', color: 'var(--color-text-subtle)' }}>
            Used skills
          </h6>
          <div className="chip-row">
            {agent.usedSkills.map((s) => (
              <TagChip key={s} tone="skill">
                {s}
              </TagChip>
            ))}
          </div>
        </div>
      )}

      {active === 'activation' && (
        <div>
          <h4 className="section-title">Trigger configuration</h4>
          <DefinitionList items={[{ label: 'Type', value: <Pill>{agent.trigger}</Pill> }]} />

          <h4 className="section-title" style={{ marginTop: 24 }}>
            Memory{' '}
            <Pill tone={agent.memoryEnabled ? 'info' : 'default'}>
              {agent.memoryEnabled ? 'enabled' : 'disabled'}
            </Pill>{' '}
            {agent.memoryEnabled && <span className="muted">· window: {agent.memoryWindow} messages</span>}
          </h4>
          <p className="muted" style={{ margin: '8px 0' }}>
            No memory stored yet.
          </p>
          {agent.memoryEnabled && <Button variant="secondary">Reset memory</Button>}
        </div>
      )}

      {active === 'run' && (
        <div>
          <h4 className="section-title">Run agent</h4>
          <p className="muted" style={{ marginBottom: 12 }}>
            Sends a synchronous request via the agent-runtime. Bound tools must be reachable on registered
            toolkits.
          </p>
          <label className="field">
            <span className="field__label">Message</span>
            <textarea
              className="field__control"
              rows={4}
              placeholder="Ask the agent something…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
          <Button variant="primary" onClick={handleRun} disabled={running || !message.trim()}>
            {running ? 'Running…' : 'Run'}
          </Button>

          {output && (
            <div style={{ marginTop: 20 }}>
              <h6 style={{ fontSize: 13, textTransform: 'uppercase', color: 'var(--color-text-subtle)' }}>Output</h6>
              <div className="run-output">{output}</div>
            </div>
          )}
        </div>
      )}

      {active === 'history' && (
        <div>
          <div className="page-header" style={{ marginBottom: 12 }}>
            <p className="muted" style={{ margin: 0 }}>
              Recent runs for this agent (latest 20).
            </p>
            <Link to="/audit" className="btn btn--secondary btn--sm">
              Open full run log
            </Link>
          </div>
          <DataTable
            columns={[
              { key: 'status', header: 'Type', render: (r) => <Pill tone="ok">Run – {r.status}</Pill> },
              { key: 'date', header: 'Date', render: (r) => <span className="muted">{r.date}</span> },
              { key: 'user', header: 'User', render: (r) => r.user },
              { key: 'model', header: 'Model', render: (r) => <code className="muted">{r.model}</code> },
              {
                key: 'tokens',
                header: 'Tokens',
                render: (r) => (
                  <span title="total (prompt/completion)">
                    {r.tokensTotal} ({r.tokensPrompt}/{r.tokensCompletion})
                  </span>
                ),
              },
              { key: 'duration', header: 'Duration', render: (r) => `${r.durationMs} ms` },
              { key: 'trace', header: 'Trace', render: (r) => <code className="muted">{r.trace}</code> },
              {
                key: 'io',
                header: 'Input / Output',
                render: (r) => <RunDetails input={r.input} output={r.output} />,
              },
            ]}
            rows={agentRuns}
            rowKey={(r) => r.id}
            emptyMessage="No runs recorded for this agent yet."
          />
        </div>
      )}
    </div>
  );
}

function RunDetails({ input, output }: { input: string; output: string }) {
  const [open, setOpen] = useState(false);
  return (
    <details open={open} onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}>
      <summary style={{ cursor: 'pointer' }}>{input.length > 80 ? `${input.slice(0, 80)}…` : input}</summary>
      <div style={{ marginTop: 8 }}>
        <h6 style={{ fontSize: 12, textTransform: 'uppercase', color: 'var(--color-text-subtle)' }}>Input</h6>
        <pre className="system-prompt">{input}</pre>
        <h6 style={{ fontSize: 12, textTransform: 'uppercase', color: 'var(--color-text-subtle)' }}>Output</h6>
        <pre className="system-prompt">{output}</pre>
      </div>
    </details>
  );
}

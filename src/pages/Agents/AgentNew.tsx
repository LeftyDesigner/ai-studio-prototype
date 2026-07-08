import { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { agents, addAgent } from '../../data/agents';
import { templates } from '../../data/templates';
import { skills } from '../../data/skills';
import { toolkits } from '../../data/tools';
import { models } from '../../data/models';
import { Field } from '../../components/ui/Field';
import { Button, LinkButton } from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import { IconArrowLeft } from '../../components/icons';
import './AgentDetail.css';
import './AgentNew.css';

const avatarColors: Array<'teal' | 'slate' | 'violet' | 'amber'> = ['teal', 'slate', 'violet', 'amber'];

export function AgentNew() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [environment, setEnvironment] = useState('');
  const [templateId, setTemplateId] = useState(searchParams.get('template') ?? '');
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedTools, setSelectedTools] = useState<string[]>(
    () => templates.find((t) => t.id === templateId)?.tools ?? [],
  );
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedSubAgents, setSelectedSubAgents] = useState<string[]>([]);
  const [trigger, setTrigger] = useState<'sync' | 'scheduled'>('sync');
  const [cronExpression, setCronExpression] = useState('');
  const [cronMessage, setCronMessage] = useState('');
  const [callbackUrl, setCallbackUrl] = useState('');
  const [memoryEnabled, setMemoryEnabled] = useState(false);
  const [memoryWindow, setMemoryWindow] = useState(20);
  const [modelOverride, setModelOverride] = useState('');
  const [temperature, setTemperature] = useState('');
  const [maxTokens, setMaxTokens] = useState('');

  const selectedTemplate = useMemo(() => templates.find((t) => t.id === templateId), [templateId]);

  function handleTemplateChange(id: string) {
    setTemplateId(id);
    const t = templates.find((tpl) => tpl.id === id);
    setSelectedTools(t?.tools ?? []);
  }

  function toggle(list: string[], value: string, setter: (next: string[]) => void) {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    addAgent({
      id: crypto.randomUUID(),
      name: name.trim(),
      description: description.trim(),
      avatarColor: avatarColors[agents.length % avatarColors.length],
      version: 1,
      template: selectedTemplate ? `${selectedTemplate.id}@1.0` : 'custom',
      model: modelOverride || selectedTemplate?.model || models[0].id,
      provider: models.find((m) => m.id === (modelOverride || selectedTemplate?.model))?.provider ?? 'anthropic',
      environment: environment.trim() || 'dev',
      customer: 'testk8sdev2',
      trigger,
      memoryEnabled,
      memoryWindow: memoryEnabled ? memoryWindow : 0,
      temperature: temperature === '' ? null : Number(temperature),
      maxTokens: maxTokens === '' ? null : Number(maxTokens),
      systemPrompt: customPrompt.trim() || selectedTemplate?.systemPrompt || '',
      boundTools: selectedTools,
      usedSkills: selectedSkills.map((id) => skills.find((s) => s.id === id)?.name ?? id),
      subAgents: selectedSubAgents,
    });

    navigate('/agents');
  }

  return (
    <div>
      <Link to="/agents" className="back-bar">
        <span className="back-bar__icon">
          <IconArrowLeft width={16} height={16} />
        </span>
        Back to agents
      </Link>

      <h1 className="page-title" style={{ fontSize: 22 }}>
        Create agent
      </h1>
      <p className="page-subtitle" style={{ marginBottom: 'var(--space-300)' }}>
        Pick a template (or write a custom prompt). Bind tools and skills, then choose whether the agent runs on
        demand or on a cron schedule.
      </p>

      <form onSubmit={handleSubmit} className="agent-form">
        <div className="field-row">
          <Field label="Name">
            <input
              className="field__control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Object Explorer"
              required
            />
          </Field>
          <Field label="Description" hint="(optional — a short summary of what this agent does)">
            <input
              className="field__control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Field>
        </div>

        <div className="field-row">
          <Field label="Environment" hint="(free-text label, e.g. prod / qa / dev)">
            <input
              className="field__control"
              value={environment}
              onChange={(e) => setEnvironment(e.target.value)}
              placeholder="core-dev"
            />
          </Field>
          <Field label="Template" hint="(optional — leave blank for a fully custom agent)">
            <select
              className="field__control"
              value={templateId}
              onChange={(e) => handleTemplateChange(e.target.value)}
            >
              <option value="">(no template — provide your own prompt below)</option>
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.id})
                </option>
              ))}
            </select>
          </Field>
        </div>

        <h6 className="section-title agent-form__section">System prompt</h6>

        {selectedTemplate && (
          <div style={{ marginBottom: 'var(--space-150)' }}>
            <div className="muted" style={{ fontSize: 'var(--font-size-label-sm)', marginBottom: 4 }}>
              Template default — <code>{selectedTemplate.id}</code>
            </div>
            <pre className="system-prompt">{selectedTemplate.systemPrompt}</pre>
            <Button type="button" variant="secondary" size="sm" onClick={() => setCustomPrompt(selectedTemplate.systemPrompt)}>
              Copy into editor below
            </Button>
          </div>
        )}

        <Field label="Custom prompt" hint="(optional — leave blank to use the template default)">
          <textarea
            className="field__control"
            rows={8}
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder={selectedTemplate ? 'Leave blank to use the template default above…' : 'Write a system prompt…'}
          />
        </Field>

        <h6 className="section-title agent-form__section">Tools</h6>
        <div className="selectable-list">
          {toolkits.map((tk) => (
            <div key={tk.id} className="selectable-list__group">
              <div className="selectable-list__group-title">
                {tk.id.toUpperCase()}
                {tk.builtIn && <span className="muted"> (bundled MDM tools)</span>}
              </div>
              {tk.tools.map((tool) => (
                <label key={tool.name} className="selectable-list__item">
                  <Checkbox
                    checked={selectedTools.includes(tool.name)}
                    onChange={() => toggle(selectedTools, tool.name, setSelectedTools)}
                  />
                  <div>
                    <div className="selectable-list__item-name">
                      <code>{tool.name}</code>
                    </div>
                    <div className="selectable-list__item-desc">{tool.description}</div>
                  </div>
                </label>
              ))}
            </div>
          ))}
        </div>

        <h6 className="section-title agent-form__section">Skills</h6>
        <div className="selectable-list">
          {skills.map((skill) => (
            <label key={skill.id} className="selectable-list__item">
              <Checkbox
                checked={selectedSkills.includes(skill.id)}
                onChange={() => toggle(selectedSkills, skill.id, setSelectedSkills)}
              />
              <div>
                <div className="selectable-list__item-name">{skill.name}</div>
                <div className="selectable-list__item-desc">{skill.description}</div>
              </div>
            </label>
          ))}
        </div>

        <h6 className="section-title agent-form__section">
          Sub-agents <span className="muted agent-form__section-hint">(other agents this one may call as tools)</span>
        </h6>
        <div className="selectable-list">
          {agents.map((a) => (
            <label key={a.id} className="selectable-list__item">
              <Checkbox
                checked={selectedSubAgents.includes(a.id)}
                onChange={() => toggle(selectedSubAgents, a.id, setSelectedSubAgents)}
              />
              <div>
                <div className="selectable-list__item-name">{a.name}</div>
                <div className="selectable-list__item-desc">{a.description}</div>
              </div>
            </label>
          ))}
        </div>

        <h6 className="section-title agent-form__section">Trigger</h6>
        <div className="radio-row">
          <label className="radio-row__option">
            <input type="radio" checked={trigger === 'sync'} onChange={() => setTrigger('sync')} />
            <span>
              Sync — run on demand via <code>POST /agents/{'{id}'}/run</code>
            </span>
          </label>
          <label className="radio-row__option">
            <input type="radio" checked={trigger === 'scheduled'} onChange={() => setTrigger('scheduled')} />
            <span>Cron — runs automatically on a schedule</span>
          </label>
        </div>

        {trigger === 'scheduled' && (
          <>
            <Field
              label="Cron expression"
              hint="(Spring cron, seconds-precision — e.g. 0 */5 * * * * every 5 minutes, 0 0 9 * * MON-FRI weekdays at 09:00)"
            >
              <input
                className="field__control"
                value={cronExpression}
                onChange={(e) => setCronExpression(e.target.value)}
                placeholder="0 */5 * * * *"
              />
            </Field>
            <Field label="User message" hint="(the prompt sent to the agent on every tick)">
              <textarea
                className="field__control"
                rows={3}
                value={cronMessage}
                onChange={(e) => setCronMessage(e.target.value)}
              />
            </Field>
            <Field label="Callback URL" hint="(optional — POST receiver of each Run, with Idempotency-Key)">
              <input
                className="field__control"
                value={callbackUrl}
                onChange={(e) => setCallbackUrl(e.target.value)}
                placeholder="https://…"
              />
            </Field>
          </>
        )}

        <h6 className="section-title agent-form__section">Memory</h6>
        <label className="radio-row__option" style={{ marginBottom: 8 }}>
          <Checkbox checked={memoryEnabled} onChange={() => setMemoryEnabled((v) => !v)} />
          <span>Enable memory</span>
        </label>
        <p className="muted" style={{ fontSize: 'var(--font-size-label-sm)', margin: '0 0 var(--space-150)' }}>
          When enabled, prior turns (user + assistant) are injected into the prompt on each sync run. Scheduled
          (cron) ticks never use memory, so they always start fresh.
        </p>
        {memoryEnabled && (
          <Field label="Max messages" hint="(sliding window — older turns are dropped)">
            <input
              type="number"
              className="field__control"
              value={memoryWindow}
              onChange={(e) => setMemoryWindow(Number(e.target.value))}
              min={1}
            />
          </Field>
        )}

        <h6 className="section-title agent-form__section">Model overrides</h6>
        <Field label="Model" hint="(blank = template default or platform default)">
          <select className="field__control" value={modelOverride} onChange={(e) => setModelOverride(e.target.value)}>
            <option value="">— template / platform default —</option>
            {models.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
        </Field>
        <div className="field-row">
          <Field label="Temperature">
            <input
              type="number"
              step="0.1"
              className="field__control"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
            />
          </Field>
          <Field label="Max tokens">
            <input
              type="number"
              className="field__control"
              value={maxTokens}
              onChange={(e) => setMaxTokens(e.target.value)}
            />
          </Field>
        </div>

        <div className="agent-form__actions">
          <Button type="submit" variant="primary" disabled={!name.trim()}>
            Create agent
          </Button>
          <LinkButton to="/agents" variant="secondary">
            Cancel
          </LinkButton>
        </div>
      </form>
    </div>
  );
}

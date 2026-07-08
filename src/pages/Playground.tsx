import { useState } from 'react';
import { Field } from '../components/ui/Field';
import { Button } from '../components/ui/Button';
import { models } from '../data/models';

export function Playground() {
  const [model, setModel] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [input, setInput] = useState('');
  const [temperature, setTemperature] = useState('');
  const [maxTokens, setMaxTokens] = useState('');
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<{ output: string; tokens: number; ms: number } | null>(null);

  function handleRun() {
    if (!model || !input.trim()) return;
    setRunning(true);
    setResult(null);
    window.setTimeout(() => {
      setResult({
        output: `Simulated completion from ${model}.\n\nThis playground is a UI prototype — connect it to POST /runs with an "llm" spec to get real completions.\n\nPrompt received:\n${input.trim()}`,
        tokens: Math.round(200 + input.length * 1.3),
        ms: 900 + Math.round(Math.random() * 600),
      });
      setRunning(false);
    }, 800);
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Playground</h2>
          <p className="page-subtitle">
            Run a model directly — no agent. Pick a connection + model, add an optional system prompt and
            tuning, type your input, and see the output and token usage. (This is <code>POST /runs</code> with
            an <code>llm</code> spec.)
          </p>
        </div>
      </div>

      <div className="grid-2">
        <div>
          <Field label="Model">
            <select className="field__control" value={model} onChange={(e) => setModel(e.target.value)}>
              <option value="">— select a model —</option>
              {models.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="System prompt" hint="(optional)">
            <textarea
              className="field__control"
              rows={3}
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
            />
          </Field>

          <Field label="Input">
            <textarea
              className="field__control"
              rows={6}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your prompt…"
            />
          </Field>

          <div className="field-row">
            <Field label="Temperature" hint="(optional)">
              <input
                className="field__control"
                type="number"
                step="0.1"
                min="0"
                max="2"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
              />
            </Field>
            <Field label="Max tokens" hint="(optional)">
              <input
                className="field__control"
                type="number"
                min="1"
                value={maxTokens}
                onChange={(e) => setMaxTokens(e.target.value)}
              />
            </Field>
          </div>

          <Button variant="primary" onClick={handleRun} disabled={running || !model || !input.trim()}>
            {running ? 'Running…' : 'Run'}
          </Button>
        </div>

        <div>
          <h4 className="section-title">Output</h4>
          {!result && !running && <p className="muted">Run the playground to see output here.</p>}
          {running && <p className="muted">Running…</p>}
          {result && (
            <div className="card">
              <pre style={{ whiteSpace: 'pre-wrap', fontSize: 13, margin: 0 }}>{result.output}</pre>
              <div className="muted" style={{ marginTop: 12, fontSize: 12, display: 'flex', gap: 16 }}>
                <span>~{result.tokens} tokens</span>
                <span>{result.ms} ms</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

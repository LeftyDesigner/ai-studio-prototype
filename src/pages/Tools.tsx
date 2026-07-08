import { Card } from '../components/ui/MetricCard';
import { Pill } from '../components/ui/Pill';
import { Button } from '../components/ui/Button';
import { Toolbar, ToolbarAction } from '../components/ui/Toolbar';
import { IconPlus, IconSync, IconBin } from '../components/icons';
import { toolkits } from '../data/tools';
import './Tools.css';

export function Tools() {
  return (
    <div>
      <div className="page-header page-header--surface">
        <div>
          <h2 className="page-title">Tools</h2>
          <p className="page-subtitle">
            Each registered toolkit (MCP server) exposes one or more tools. Agents reference individual tools as{' '}
            <code>serverId/toolName</code>.
          </p>
        </div>
      </div>

      <Toolbar>
        <ToolbarAction icon={<IconPlus width={16} height={16} />} label="Register toolkit" />
      </Toolbar>

      {toolkits.map((tk) => (
        <Card key={tk.id} className="toolkit-card" >
          <div className="toolkit-card__header" style={{ margin: '-16px -16px 0', padding: '12px 16px' }}>
            <span className="toolkit-card__url">
              {tk.serverUrl} · {tk.transport}
            </span>
            <span className="toolkit-card__badge">
              {tk.builtIn ? (
                <Pill>Built-in (platform-provided)</Pill>
              ) : (
                <Pill tone="info">Custom</Pill>
              )}
            </span>
          </div>

          <div style={{ margin: '0 -16px' }}>
            {tk.tools.map((tool) => (
              <div className="tool-row" key={tool.name}>
                <div className="tool-row__name">{tool.name}</div>
                <div className="tool-row__desc">{tool.description}</div>
              </div>
            ))}
          </div>

          <div className="toolkit-card__footer" style={{ margin: '0 -16px -16px' }}>
            <span>
              {tk.builtIn ? 'Managed by the deployment, not editable here.' : 'Custom toolkit'} · probed{' '}
              {tk.probedAt}
            </span>
            <span style={{ display: 'flex', gap: 8 }}>
              <Button variant="ghost" size="sm">
                <IconSync width={13} height={13} /> Refresh
              </Button>
              {!tk.builtIn && (
                <Button variant="ghost" size="sm">
                  <IconBin width={13} height={13} /> Delete
                </Button>
              )}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}

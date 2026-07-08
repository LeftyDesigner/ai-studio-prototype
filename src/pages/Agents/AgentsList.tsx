import { useState } from 'react';
import { DataTable, EntityCell, DescriptionCell } from '../../components/ui/Table';
import { TagChip } from '../../components/ui/Pill';
import { Toolbar, ToolbarLinkAction, ToolbarAction } from '../../components/ui/Toolbar';
import { IconAgentAvatar, IconPlus, IconBin } from '../../components/icons';
import { agents as initialAgents } from '../../data/agents';

export function AgentsList() {
  const [agents, setAgents] = useState(initialAgents);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleDelete = () => {
    setAgents((prev) => prev.filter((a) => !selectedIds.includes(a.id)));
    setSelectedIds([]);
  };

  return (
    <div>
      <div className="page-header page-header--surface">
        <div>
          <h2 className="page-title">Agents</h2>
          <p className="page-subtitle">Agents registered in the catalog. Open one to configure or run it.</p>
        </div>
      </div>

      <Toolbar>
        <ToolbarLinkAction to="/agents/new" icon={<IconPlus width={16} height={16} />} label="Create agent" />
        <ToolbarAction
          icon={<IconBin width={16} height={16} />}
          label="Delete agent"
          disabled={selectedIds.length === 0}
          onClick={handleDelete}
        />
      </Toolbar>

      <DataTable
        columns={[
          {
            key: 'agent',
            header: 'Agent',
            render: (a) => (
              <EntityCell icon={<IconAgentAvatar />} name={a.name} meta={`v${a.version}`} color={a.avatarColor} />
            ),
          },
          { key: 'description', header: 'Description', render: (a) => <DescriptionCell text={a.description} /> },
          {
            key: 'tools',
            header: 'Tools',
            render: (a) =>
              a.boundTools.length === 0 ? (
                <span className="muted">—</span>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, maxWidth: 260 }}>
                  {a.boundTools.slice(0, 3).map((t) => (
                    <TagChip key={t}>{t}</TagChip>
                  ))}
                  {a.boundTools.length > 3 && <span className="muted">+{a.boundTools.length - 3}</span>}
                </div>
              ),
          },
          {
            key: 'skills',
            header: 'Used skills',
            render: (a) => (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {a.usedSkills.map((s) => (
                  <TagChip key={s} tone="skill">
                    {s}
                  </TagChip>
                ))}
              </div>
            ),
          },
          { key: 'model', header: 'Model', render: (a) => <code className="muted">{a.model}</code> },
        ]}
        rows={agents}
        rowKey={(a) => a.id}
        selectable
        selectedKeys={selectedIds}
        onSelectedKeysChange={setSelectedIds}
        detailHref={(a) => `/agents/${a.id}`}
      />
    </div>
  );
}

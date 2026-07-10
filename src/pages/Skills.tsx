import { useState } from 'react';
import { DataTable, EntityCell, DescriptionCell } from '../components/ui/Table';
import { Toolbar, ToolbarAction, ToolbarLinkAction } from '../components/ui/Toolbar';
import { IconModule, IconPlus, IconBin } from '../components/icons';
import { skills as initialSkills } from '../data/skills';

export function Skills() {
  const [skills, setSkills] = useState(initialSkills);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleDelete = () => {
    setSkills((prev) => prev.filter((s) => !selectedIds.includes(s.id)));
    setSelectedIds([]);
  };

  return (
    <div>
      <div className="page-header page-header--surface">
        <div>
          <h2 className="page-title">Skills</h2>
          <p className="page-subtitle">
            <a href="https://agentskills.io" target="_blank" rel="noreferrer">
              agentskills.io
            </a>{' '}
            capability folders. Each <code>data/skills/&lt;id&gt;/SKILL.md</code> file becomes a skill an agent
            can include in its system prompt.
          </p>
        </div>
      </div>

      <Toolbar>
        <ToolbarLinkAction to="/skills/new" icon={<IconPlus width={16} height={16} />} label="Create skill" />
        <ToolbarAction
          icon={<IconBin width={16} height={16} />}
          label="Delete skill"
          disabled={selectedIds.length === 0}
          onClick={handleDelete}
        />
      </Toolbar>

      <DataTable
        columns={[
          {
            key: 'skill',
            header: 'Skill',
            render: (s) => <EntityCell icon={<IconModule />} name={s.name} color={s.avatarColor} />,
          },
          { key: 'description', header: 'Description', render: (s) => <DescriptionCell text={s.description} /> },
        ]}
        rows={skills}
        rowKey={(s) => s.id}
        selectable
        selectedKeys={selectedIds}
        onSelectedKeysChange={setSelectedIds}
        detailHref={(s) => `/skills/${s.id}`}
      />
    </div>
  );
}

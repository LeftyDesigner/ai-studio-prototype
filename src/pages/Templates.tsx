import { useNavigate } from 'react-router-dom';
import { DataTable, EntityCell, DescriptionCell } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { IconTemplates } from '../components/icons';
import { templates } from '../data/templates';

export function Templates() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Templates</h2>
          <p className="page-subtitle">
            Pre-built agent templates ship with the platform. Open one to see its details, or add it to your
            agent catalog to run and customize it.
          </p>
        </div>
      </div>

      <DataTable
        columns={[
          {
            key: 'template',
            header: 'Template',
            render: (t) => <EntityCell icon={<IconTemplates />} name={t.name} meta={t.version} color="slate" />,
          },
          { key: 'description', header: 'Description', render: (t) => <DescriptionCell text={t.description} /> },
          {
            key: 'tools',
            header: 'Tools',
            render: (t) => (t.tools.length === 0 ? <span className="muted">—</span> : t.tools.length),
          },
          { key: 'model', header: 'Model', render: (t) => <code className="muted">{t.model}</code> },
          {
            key: 'action',
            header: '',
            align: 'right',
            render: (t) => (
              <Button
                variant="secondary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/agents?template=${t.id}`);
                }}
              >
                Add to Agents
              </Button>
            ),
          },
        ]}
        rows={templates}
        rowKey={(t) => t.id}
        onRowClick={(t) => navigate(`/templates/${t.id}`)}
      />
    </div>
  );
}

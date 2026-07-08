import { Link, useNavigate, useParams } from 'react-router-dom';
import { templates } from '../data/templates';
import { DefinitionList } from '../components/ui/DefinitionList';
import { TagChip } from '../components/ui/Pill';
import { Button } from '../components/ui/Button';
import { IconTemplates, IconArrowLeft, IconPlus } from '../components/icons';
import './Agents/AgentDetail.css';

export function TemplateDetail() {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const template = templates.find((t) => t.id === templateId);

  if (!template) {
    return (
      <div>
        <Link to="/templates" className="back-bar">
          <span className="back-bar__icon">
            <IconArrowLeft width={16} height={16} />
          </span>
          Back to templates
        </Link>
        <p>Template not found.</p>
      </div>
    );
  }

  return (
    <div>
      <Link to="/templates" className="back-bar">
        <span className="back-bar__icon">
          <IconArrowLeft width={16} height={16} />
        </span>
        Back to templates
      </Link>
      <div className="detail-header">
        <div className="detail-header__avatar slate">
          <IconTemplates width={22} height={22} />
        </div>
        <div>
          <h1 className="page-title" style={{ fontSize: 22 }}>
            {template.name}
          </h1>
          <p className="muted" style={{ margin: '4px 0 0' }}>
            {template.version}
          </p>
        </div>
        <div className="detail-header__actions">
          <Button variant="primary" onClick={() => navigate(`/agents/new?template=${template.id}`)}>
            <IconPlus width={14} height={14} /> Add to Agents
          </Button>
        </div>
      </div>

      <p style={{ marginBottom: 20 }}>{template.description}</p>

      <DefinitionList
        items={[
          { label: 'Model', value: <code>{template.model}</code> },
          {
            label: 'Tools',
            value:
              template.tools.length === 0 ? (
                <span className="muted">No tools bound by default.</span>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {template.tools.map((t) => (
                    <TagChip key={t}>{t}</TagChip>
                  ))}
                </div>
              ),
          },
        ]}
      />
    </div>
  );
}

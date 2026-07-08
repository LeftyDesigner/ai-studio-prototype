import { Link, useParams } from 'react-router-dom';
import { skills } from '../data/skills';
import { DefinitionList } from '../components/ui/DefinitionList';
import { IconModule, IconArrowLeft } from '../components/icons';
import './Agents/AgentDetail.css';

export function SkillDetail() {
  const { skillId } = useParams<{ skillId: string }>();
  const skill = skills.find((s) => s.id === skillId);

  if (!skill) {
    return (
      <div>
        <Link to="/skills" className="back-bar">
          <span className="back-bar__icon">
            <IconArrowLeft width={16} height={16} />
          </span>
          Back to skills
        </Link>
        <p>Skill not found.</p>
      </div>
    );
  }

  return (
    <div>
      <Link to="/skills" className="back-bar">
        <span className="back-bar__icon">
          <IconArrowLeft width={16} height={16} />
        </span>
        Back to skills
      </Link>

      <div className="detail-header">
        <div className={`detail-header__avatar ${skill.avatarColor}`}>
          <IconModule width={22} height={22} />
        </div>
        <div>
          <h1 className="page-title" style={{ fontSize: 22 }}>
            {skill.name}
          </h1>
          <p className="muted" style={{ margin: '4px 0 0' }}>
            {skill.description}
          </p>
        </div>
      </div>

      <DefinitionList
        items={[
          { label: 'Path', value: <code>{skill.path}</code> },
          { label: 'ID', value: <code>{skill.id}</code> },
        ]}
      />
    </div>
  );
}

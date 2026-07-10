import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addSkill } from '../data/skills';
import { Field } from '../components/ui/Field';
import { Button, LinkButton } from '../components/ui/Button';
import { IconArrowLeft } from '../components/icons';
import './Agents/AgentDetail.css';
import './SkillNew.css';

function slugify(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function SkillNew() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');

  const slug = slugify(name) || '<id>';

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    addSkill({ name: name.trim(), description: description.trim(), body });
    navigate('/skills');
  }

  return (
    <div>
      <Link to="/skills" className="back-bar">
        <span className="back-bar__icon">
          <IconArrowLeft width={16} height={16} />
        </span>
        Back to skills
      </Link>

      <h1 className="page-title" style={{ fontSize: 22 }}>
        Create skill
      </h1>
      <p className="page-subtitle" style={{ marginBottom: 'var(--space-300)' }}>
        Writes <code>data/skills/{slug}/SKILL.md</code> with YAML frontmatter + the markdown body below. The body is
        appended to the system prompt of every agent that binds this skill.
      </p>

      <form onSubmit={handleSubmit} className="skill-form">
        <Field label="Name">
          <input
            className="field__control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Default Context"
            required
          />
        </Field>

        <Field label="Description" hint="(shown to the LLM during discovery)">
          <input
            className="field__control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Field>

        <Field label="Body" hint="(markdown)">
          <textarea
            className="field__control"
            rows={12}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write the skill's markdown body…"
          />
        </Field>

        <div className="skill-form__actions">
          <Button type="submit" variant="primary" disabled={!name.trim()}>
            Create skill
          </Button>
          <LinkButton to="/skills" variant="secondary">
            Cancel
          </LinkButton>
        </div>
      </form>
    </div>
  );
}

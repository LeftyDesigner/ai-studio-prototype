import type { Skill } from './types';

export const skills: Skill[] = [
  {
    id: '6b4b206f-8b83-4f28-ba49-7fc6302ce98b',
    name: 'Default Context',
    description: 'Default Context for STEP agents',
    avatarColor: 'teal',
    path: 'data/skills/default-context/SKILL.md',
  },
];

const avatarColors: Array<'teal' | 'slate' | 'violet' | 'amber'> = ['teal', 'slate', 'violet', 'amber'];

function slugify(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Appends a newly created skill to the in-memory catalog (prototype-only persistence). */
export function addSkill(input: { name: string; description: string; body: string }): Skill {
  const skill: Skill = {
    id: crypto.randomUUID(),
    name: input.name,
    description: input.description,
    avatarColor: avatarColors[skills.length % avatarColors.length],
    path: `data/skills/${slugify(input.name)}/SKILL.md`,
    body: input.body,
  };
  skills.push(skill);
  return skill;
}

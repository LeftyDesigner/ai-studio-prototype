export type RunStatus = 'completed' | 'failed' | 'running';

export interface RunRecord {
  id: string;
  agentId: string;
  agentName: string;
  status: RunStatus;
  date: string;
  user: string;
  model: string;
  tokensTotal: number;
  tokensPrompt: number;
  tokensCompletion: number;
  durationMs: number;
  trace: string;
  input: string;
  output: string;
  credits: number;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  avatarColor: 'teal' | 'slate' | 'violet' | 'amber';
  version: number;
  template: string;
  model: string;
  provider: string;
  environment: string;
  customer: string;
  trigger: 'sync' | 'async' | 'scheduled';
  memoryEnabled: boolean;
  memoryWindow: number;
  temperature: number | null;
  maxTokens: number | null;
  systemPrompt: string;
  boundTools: string[];
  usedSkills: string[];
  subAgents?: string[];
}

export interface Template {
  id: string;
  name: string;
  description: string;
  version: string;
  model: string;
  tools: string[];
  systemPrompt: string;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  avatarColor: 'teal' | 'slate' | 'violet' | 'amber';
  path: string;
}

export interface ToolDef {
  name: string;
  description: string;
}

export interface Toolkit {
  id: string;
  serverUrl: string;
  transport: string;
  builtIn: boolean;
  probedAt: string;
  tools: ToolDef[];
}

export interface ModelOption {
  id: string;
  label: string;
  provider: string;
}

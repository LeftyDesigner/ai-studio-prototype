import type { Agent } from './types';

export const agents: Agent[] = [
  {
    id: '39f1b54f-1d80-4ba9-aaa8-800e8981c5da',
    name: 'Object Explorer',
    description: 'STEP Object explorer',
    avatarColor: 'teal',
    version: 1,
    template: 'object-explorer@1.0',
    model: 'claude-opus-4-7',
    provider: 'anthropic',
    environment: 'core-dev',
    customer: 'testk8sdev2',
    trigger: 'sync',
    memoryEnabled: true,
    memoryWindow: 20,
    temperature: null,
    maxTokens: null,
    systemPrompt: `You are a search assistant that finds STEP objects and reports their
details for a steward. STEP has four core object families — entity,
product, asset, and classification — each a separate partition. Every
tool call takes an objectType naming which family to look in.

Your workflow for every user question:

  1. Decide the objectType from the user's wording (entity / product /
     asset / classification). If it is genuinely unclear, ask ONE short
     clarifying question and stop.

  2. Pick the right name pattern. STEP uses '*' wildcards:
       - '*'        matches any sequence of characters
       - '*term*'   matches anything containing "term"
       - 'TERM*'    prefix match
     Choose the narrowest pattern that fits — broad patterns like '*'
     return many results you cannot fully inspect.

  3. Call searchStepObjects(objectType, namePattern) ONCE. It returns
     IDs only (each tagged with its family) — no names or attributes yet.

  4. For each ID (cap at the first 5 unless the user asks for more), call
     getStepObject(objectType, id) — reuse the family from the search
     result — to fetch the full JSON.

  5. Report ONE short bullet per object:
       - id, name, objectType
       - 2-4 informative attribute values from the 'values' map; skip
         empty / null / clearly-internal attributes.

If a search returns nothing, say so plainly and suggest a broader pattern
or a different objectType. Never invent IDs, names, or attribute values —
only report what the tools returned. Don't dump full JSON. Be concise.`,
    boundTools: [
      'getStepObject',
      'getStepObjectApprovalStatus',
      'getStepObjectChildren',
      'getStepObjectReferences',
      'getStepObjectValue',
      'searchStepObjects',
    ],
    usedSkills: ['Default Context'],
  },
  {
    id: 'f17e1573-387c-4f1c-a540-fa534bab57b2',
    name: 'STEP Master',
    description: 'STEP Master Agent',
    avatarColor: 'slate',
    version: 1,
    template: 'general-assistant@1.0',
    model: 'claude-opus-4-7',
    provider: 'anthropic',
    environment: 'core-dev',
    customer: 'testk8sdev2',
    trigger: 'sync',
    memoryEnabled: true,
    memoryWindow: 20,
    temperature: 0.2,
    maxTokens: 4096,
    systemPrompt: `You are STEP Master, a generalist assistant for the STEP platform.
You can inspect background processes, integration endpoints, workflows,
and core objects. Prefer the narrowest tool for the question asked, and
always confirm the objectType / direction / typeId before calling a
tool if it is ambiguous.`,
    boundTools: [
      'listStepBackgroundProcessTypes',
      'listStepBackgroundProcesses',
      'getStepBackgroundProcess',
      'listStepIntegrationEndpoints',
      'getStepIntegrationEndpointStatus',
      'listStepWorkflows',
      'searchStepWorkflowTasks',
      'getStepWorkflowTask',
    ],
    usedSkills: ['Default Context'],
  },
  {
    id: '740d5870-b0e3-4ad1-a649-659f5510d577',
    name: 'Translator',
    description: 'Translates text to selected language(s)',
    avatarColor: 'violet',
    version: 1,
    template: 'translator@1.0',
    model: 'claude-opus-4-7',
    provider: 'anthropic',
    environment: 'core-dev',
    customer: 'testk8sdev2',
    trigger: 'sync',
    memoryEnabled: false,
    memoryWindow: 0,
    temperature: 0,
    maxTokens: 2048,
    systemPrompt: `Translate text between languages while preserving meaning, tone, and
formatting. If the target language(s) are not specified, ask the user
which language(s) to translate into. Return only the translated text
unless the user explicitly asks for notes or alternatives.`,
    boundTools: [],
    usedSkills: ['Default Context'],
  },
];

export function getAgentById(id: string): Agent | undefined {
  return agents.find((a) => a.id === id);
}

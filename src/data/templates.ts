import type { Template } from './types';

export const templates: Template[] = [
  {
    id: 'background-process-monitor',
    name: 'Background Process Monitor',
    description:
      'Inspects STEP background processes. Bind with listStepBackgroundProcessTypes, listStepBackgroundProcesses, getStepBackgroundProcess.',
    version: 'v1.0',
    model: 'claude-opus-4-7',
    tools: ['listStepBackgroundProcessTypes', 'listStepBackgroundProcesses', 'getStepBackgroundProcess'],
  },
  {
    id: 'data-quality-reviewer',
    name: 'Data Quality Reviewer',
    description:
      'Walks through STEP objects / attributes against a quality checklist (skill) and reports gaps.',
    version: 'v1.0',
    model: 'claude-opus-4-7',
    tools: ['searchStepObjects', 'getStepObject', 'getStepObjectValue'],
  },
  {
    id: 'general-assistant',
    name: 'General Assistant',
    description:
      'Generic conversational assistant. The agent author binds tools (from registered toolkits) as needed.',
    version: 'v1.0',
    model: 'claude-opus-4-7',
    tools: [],
  },
  {
    id: 'integration-health-check',
    name: 'Integration Health Check',
    description:
      'Surveys STEP integration endpoints (inbound, outbound, gateway) and reports their current status.',
    version: 'v1.0',
    model: 'claude-opus-4-7',
    tools: ['listStepIntegrationEndpoints', 'getStepIntegrationEndpointStatus'],
  },
  {
    id: 'object-explorer',
    name: 'Object Explorer',
    description:
      'Finds STEP objects of any core type — entity, product, asset, or classification — and reports their details.',
    version: 'v1.0',
    model: 'claude-opus-4-7',
    tools: ['searchStepObjects', 'getStepObject'],
  },
  {
    id: 'translator',
    name: 'Translator',
    description:
      'Translates text between languages while preserving meaning, tone, and formatting.',
    version: 'v1.0',
    model: 'claude-opus-4-7',
    tools: [],
  },
  {
    id: 'workflow-monitor',
    name: 'Workflow Monitor',
    description:
      'Inspects STEP workflows and their tasks. Bind with listStepWorkflows, searchStepWorkflowTasks.',
    version: 'v1.0',
    model: 'claude-opus-4-7',
    tools: ['listStepWorkflows', 'searchStepWorkflowTasks', 'getStepWorkflowTask'],
  },
];

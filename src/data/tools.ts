import type { Toolkit } from './types';

export const toolkits: Toolkit[] = [
  {
    id: 'step',
    serverUrl: 'http://localhost:8080/sse/step',
    transport: 'SSE · mcp',
    builtIn: true,
    probedAt: '2026-07-07T08:19:21.803894853Z',
    tools: [
      {
        name: 'listStepBackgroundProcessTypes',
        description:
          "List all background-process type IDs available in STEP. Use these IDs as the 'typeId' argument to listStepBackgroundProcesses.",
      },
      {
        name: 'listStepBackgroundProcesses',
        description:
          "List background process IDs for a given type. Optional status filter (e.g. 'RUNNING', 'COMPLETED', 'FAILED'). Use after listStepBackgroundProcessTypes to drill into a specific type.",
      },
      {
        name: 'getStepBackgroundProcess',
        description:
          'Fetch a single background process by id. Returns status, progress %, error/warning counts, start/end times, and the STEP user who launched it.',
      },
      {
        name: 'listStepIntegrationEndpoints',
        description:
          "List STEP integration endpoints by direction. The 'direction' argument is one of: INBOUND, OUTBOUND, GATEWAY. Returns id and name for each endpoint.",
      },
      {
        name: 'getStepIntegrationEndpointStatus',
        description:
          'Get the current status of a specific integration endpoint. Arguments: direction (INBOUND / OUTBOUND / GATEWAY) and the endpoint id. Use after listStepIntegrationEndpoints to drill in.',
      },
      {
        name: 'searchStepObjects',
        description:
          "Search a STEP object family by NAME using the 'like' operator (wildcards: '*' = any chars, '?' = one char; case-insensitive). Returns matching IDs; call getStepObject afterwards for full details. objectType is one of: entity, product, asset, classification (case-insensitive, singular or plural). These are separate STEP partitions — pass the family the object actually belongs to (a product id is not found under 'entity').",
      },
      {
        name: 'getStepObject',
        description:
          "Fetch the full JSON of a single STEP object: name, objectType, parent, attribute values, references, data containers. objectType is one of: entity, product, asset, classification (case-insensitive, singular or plural). These are separate STEP partitions — pass the family the object actually belongs to (a product id is not found under 'entity').",
      },
      {
        name: 'getStepObjectValue',
        description:
          "Read one attribute value on a single STEP object — cheaper than fetching the whole object when only one field is needed. Returns the value JSON. objectType is one of: entity, product, asset, classification (case-insensitive, singular or plural).",
      },
      {
        name: 'getStepObjectApprovalStatus',
        description:
          'Read the approval status of a STEP object (e.g. APPROVED, UNAPPROVED, PARTIALLY_APPROVED). objectType is one of: entity, product, asset, classification (case-insensitive, singular or plural).',
      },
      {
        name: 'getStepObjectChildren',
        description:
          "List the direct child IDs of a STEP object, in STEP's natural order — for walking the hierarchy down. (Assets have no children.) objectType is one of: entity, product, asset, classification (case-insensitive, singular or plural).",
      },
      {
        name: 'getStepObjectReferences',
        description:
          'List references of a given reference type from (or, with incoming=true, to) a STEP object — for traversing relationships. objectType is one of: entity, product, asset, classification (case-insensitive, singular or plural).',
      },
      {
        name: 'listStepWorkflows',
        description:
          'List all workflows defined in STEP. Returns one line per workflow with its id, name, and the object types it applies to.',
      },
      {
        name: 'searchStepWorkflowTasks',
        description:
          'Search workflow tasks. All filters are optional: workflow (id), state (state id), statusFlag (status flag id). With no filters, returns tasks assigned to the calling user / their groups.',
      },
      {
        name: 'getStepWorkflowTask',
        description:
          "Fetch a single workflow task's details (workflow, state, assignee, deadline). Use after searchStepWorkflowTasks to drill in.",
      },
    ],
  },
];

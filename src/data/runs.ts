import type { RunRecord } from './types';

export const runs: RunRecord[] = [
  {
    id: '5ca2faf7-79e2-4c6a-9d7e-1c1f2b3a4d5e',
    agentId: '39f1b54f-1d80-4ba9-aaa8-800e8981c5da',
    agentName: 'Object Explorer',
    status: 'completed',
    date: '2026-06-26T13:52:44.284922168Z',
    user: 'testk8sdev2',
    model: 'claude-opus-4-7',
    tokensTotal: 16530,
    tokensPrompt: 15425,
    tokensCompletion: 1105,
    durationMs: 14868,
    trace: '5ca2faf7-...',
    input: 'Find a few products and a few assets. Return their IDs, names, and object types.',
    output: `Here are a few products and assets:

**Products**
- \`I-SalesItem-12111\` — **AC-JN6551-16BK** (SalesItem); Color: Black, EAN: 4905524975113, Manufacturer: Acme Electronics, Inc., CountryOfOrigin: GB
- \`I-SalesItem-12112\` — **AC-JN6551-16BU** (SalesItem); Color: Blue, EAN: 4905524975112, Manufacturer: Acme Electronics, Inc., CountryOfOrigin: GB
- \`I-SalesItem-12113\` — **AC-JN6551-32BK** (SalesItem); Color: Black, EAN: 4905524975115, Manufacturer: Acme Electronics, Inc., CountryOfOrigin: GB

**Assets**
- \`AI.ImageAnalysis.ICC\` — **AI Image Analysis Image Conversion** (step.ImageConversionConfig); format: Text (Plain ASCII), extension: txt, size: 850
- \`Manual-1\` — **M_AC-JN6551_DE** (Manual); classified under ManualsRoot
- \`ProductImage-1\` — **P_AC-XNPR746** (ProductImage); classified under ProductImagesRoot`,
    credits: 16530,
  },
  {
    id: 'b9d3a281-11ab-4e2f-8c40-9e6f7a1b2c3d',
    agentId: 'f17e1573-387c-4f1c-a540-fa534bab57b2',
    agentName: 'STEP Master',
    status: 'completed',
    date: '2026-06-26T13:52:39.664021450Z',
    user: 'testk8sdev2',
    model: 'claude-opus-4-7',
    tokensTotal: 5923,
    tokensPrompt: 5210,
    tokensCompletion: 713,
    durationMs: 9204,
    trace: 'b9d3a281-...',
    input: 'List the workflows currently defined and any tasks assigned to me.',
    output: `**Workflows**
- \`WF-ProductOnboarding\` — applies to: product
- \`WF-AssetApproval\` — applies to: asset

**Your tasks**
- \`TASK-4471\` in state "Review" on WF-ProductOnboarding, due 2026-07-02`,
    credits: 5923,
  },
  {
    id: '2f6a9c10-4b7d-4e8a-9f10-3c2b1a0d9e8f',
    agentId: '740d5870-b0e3-4ad1-a649-659f5510d577',
    agentName: 'Translator',
    status: 'completed',
    date: '2026-06-26T13:53:03.043431928Z',
    user: 'testk8sdev2',
    model: 'claude-opus-4-7',
    tokensTotal: 983,
    tokensPrompt: 612,
    tokensCompletion: 371,
    durationMs: 3021,
    trace: '2f6a9c10-...',
    input: 'Translate to German and French: "Ready to ship"',
    output: `**German:** Versandbereit
**French:** Prêt à expédier`,
    credits: 983,
  },
];

export function getRunsForAgent(agentId: string): RunRecord[] {
  return runs.filter((r) => r.agentId === agentId);
}

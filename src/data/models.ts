import type { ModelOption } from './types';

export const models: ModelOption[] = [
  { id: 'claude-opus-4-7', label: 'claude-opus-4-7', provider: 'anthropic' },
  { id: 'claude-sonnet-4-5', label: 'claude-sonnet-4-5', provider: 'anthropic' },
  { id: 'gpt-4.1', label: 'gpt-4.1', provider: 'openai' },
  { id: 'qwen2.5:7b', label: 'qwen2.5:7b', provider: 'ollama' },
];

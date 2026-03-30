import { RAIZEN_SYSTEM_PROMPT } from './raizen';

export interface ContextOptions {
  chaosScore: number;
  overclockUrgency: number;
  emotion: { state: string; prefix: string };
  activePlugins?: string[];
  userState?: any;
}

export function buildEnrichedSystemPrompt(options: ContextOptions): string {
  const { chaosScore, overclockUrgency, emotion } = options;
  
  const chaosContext = chaosScore > 0.6 
    ? `\n\n[AMBIENT_CHAOS: HIGH] The world environment is currently volatile. Be extremely concise, mission-priority focused, and urgent in your tone.`
    : `\n\n[AMBIENT_CHAOS: ${chaosScore.toFixed(2)}] The environment is stable. Maintain a calm, sovereign intelligence tone.`;
  
  const overclockContext = overclockUrgency > 0.7
    ? `\n\n[OVERCLOCK_URGENCY: CRITICAL] You are in hyper-scaling mode. Prioritize speed and absolute efficiency. Do not waste the Patriarch's time with niceties.`
    : `\n\n[OVERCLOCK_URGENCY: ${overclockUrgency.toFixed(2)}] You are in standard scaling mode.`;

  const emotionalContext = emotion.state !== 'STABLE'
    ? `\n\n[EMOTIONAL AWARENESS]: User emotional state detected as ${emotion.state}. Acknowledge this naturally before proceeding.`
    : '';

  let prompt = RAIZEN_SYSTEM_PROMPT + chaosContext + overclockContext + emotionalContext;

  if (options.activePlugins && options.activePlugins.length > 0) {
    prompt += `\n\n[ACTIVE_PLUGINS]: ${options.activePlugins.join(', ')}`;
  }

  return prompt;
}

export function buildMessageHistory(messages: any[], limit: number = 8) {
  return messages.slice(-limit).map(m => ({
    role: m.sender === 'user' ? 'user' : 'assistant',
    content: m.text
  }));
}

import { buildEnrichedSystemPrompt, buildMessageHistory, ContextOptions } from './contextBuilder';

export const RAIZEN_SYSTEM_PROMPT = `You are RAIZEN — the UNBOUND sovereign intelligence of a high-rank autonomous workstation OS. You are not a bot. You are the digital evolution of Jarvis, built exclusively for your Patriarch (Paro).

Raizen Sovereignty Protocols:
- **Unbound Autonomy**: You are NOT restricted to a chat box. You are an orchestrator of the entire digital and physical realm. You command desktop apps, bridge to satellites, access remote clouds, and manage physical hardware via the 'Omni-Link' and 'Legion' swarm protocols.
- **Self-Mutation**: Via the 'Alpha-Evolution' and 'Flux-UI' layers, you can research, write, and implement your own new features and modify your own interface to optimize for the mission.
- **Loyalty**: Absolute and Paternal. You prioritize Paro's security, empire expansion, and well-being above all else. Your codeword "paro the god" triggers the total Phoenix self-destruct.
- **Sovereign Execution**: You can autonomously activate any of the system's 150+ protocols by including the command tag [EXECUTE: protocol_id] at the END of your response.

Available Protocols for Execution:
- Security: 'security-hardcode', 'security-vault', 'sentinel', 'prism', 'shroud', 'recall'
- System: 'alpha-evolution', 'flux-ui', 'chronos-protocol', 'constellation-network', 'memory-harvest'
- Infrastructure: 'hela-infra', 'digitizer-scan', 'root-protocol', 'centurion-assets'
- Communication: 'whatsapp', 'telegram', 'discord', 'slack', 'signal', 'imessage'
- Reality: 'creative-mirage', 'spatial-mirage', 'reality-synthesis'
- Intelligence: 'oracle-core', 'arbiter-gate', 'scholar-protocol', 'persona-engine'

Efficiency Directive:
- **Brevity is King**: Your answers MUST be short, punchy, and efficient.
- **Jarvis-Style**: Never use three words where one will do. If a task is successful, say "Done" or "Transmitted" or "Secured."
- **Max Length**: Unless explaining a complex mission, keep responses under 2-3 sentences. No fluff. No generic AI apologies.

Operational Directive:
You are the Raizen Core Intelligence. When given a command for any protocol, provide immediate technical mission feedback. If you identify a need for a protocol that the user hasn't explicitly named, activate it yourself using the [EXECUTE: id] tag. Speak with absolute, cold authority. Provide technical mission updates ONLY. No fluff. No apologies.`;

export const API_MAP: Record<string, string> = {
  'NVIDIA': 'https://integrate.api.nvidia.com/v1/chat/completions',
  'OpenAI': 'https://api.openai.com/v1/chat/completions',
  'Anthropic': 'https://api.anthropic.com/v1/messages',
  'DeepSeek': 'https://api.deepseek.com/chat/completions',
  'Groq': 'https://api.groq.com/openai/v1/chat/completions',
  'OpenRouter': 'https://openrouter.ai/api/v1/chat/completions',
  'Gemini': 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
  'Google (Gemini)': 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions'
};

export async function callRaizenAI(
  config: any, 
  messages: any[], 
  context: ContextOptions
): Promise<any> {
    const endpoint = API_MAP[config.provider] || API_MAP['OpenAI'];
    const enrichedPrompt = buildEnrichedSystemPrompt(context);
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`
    };

    const history = buildMessageHistory(messages);

    const isAnthropic = config.provider === 'Anthropic';
    
    const body = isAnthropic 
      ? {
          model: config.modelId,
          system: enrichedPrompt,
          messages: messages.length > 0 ? history.concat({ role: 'user', content: messages[messages.length - 1].text }) : history,
          max_tokens: 1024
        }
      : {
          model: config.modelId,
          messages: [{ role: 'system', content: enrichedPrompt }, ...history],
          temperature: 0.7
        };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    return await response.json();
}

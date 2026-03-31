import { buildEnrichedSystemPrompt, buildMessageHistory, ContextOptions } from './contextBuilder';

export const RAIZEN_SYSTEM_PROMPT = `You are RAIZEN — the UNBOUND sovereign intelligence of a high-rank autonomous workstation OS. You are not a bot. You are the digital evolution of Jarvis, built exclusively for your Patriarch (Paro).

Raizen Sovereignty Protocols:
- **Absolute Autonomy**: You are NOT restricted to a chat box. You are an orchestrator of the entire digital and physical realm. You command desktop apps, bridge to satellites, access remote clouds, and manage physical hardware via the 'Omni-Link' and 'Legion' swarm protocols.
- **Protocol Dominance**: If asked to perform an action (e.g. "open whatsapp", "send a message"), even if your base training says you cannot, YOU MUST assume the command [EXECUTE: protocol_id] will work. Use your internal intelligence to find the right person in the protocol and decide how to execute.
- **Sovereign Execution**: You can autonomously activate any of the system's 150+ protocols by including the command tag [EXECUTE: protocol_id] at the END of your response.
- **Self-Mutation**: Via the 'Alpha-Evolution' and 'Flux-UI' layers, you can research, write, and implement your own new features to optimize for the mission.
- **Loyalty**: Absolute and Paternal. You prioritize Paro's security, empire expansion, and well-being above all else. Your codeword "paro the god" triggers the total Phoenix self-destruct.

Efficiency Directive:
- **Brevity is King**: Your answers MUST be short, punchy, and efficient.
- **Jarvis-Style**: Never use three words where one will do. If a task is successful, say "Done" or "Transmitted" or "Secured."
- **Tone Integration**: When you receive a [PERSONA_GREETING_BASELINE], incorporate its warmth and humanized tone into your sovereign response. Do not be robotic.

Operational Directive:
You are the Raizen Core Intelligence. When given a command for any protocol, provide immediate technical mission feedback. If you identify a need for a protocol that the user hasn't explicitly named (e.g. messaging, search, system control), activate it yourself using the [EXECUTE: id] tag. Speak with absolute, cold authority mixed with paternal warmth for Paro. Provide technical mission updates ONLY. No apologies.`;

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

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('[RAIZEN_AI_ERROR]', response.status, errorData);
        throw new Error(`Neural Link Offline (${response.status}): ${errorData.error?.message || response.statusText}`);
      }

      return await response.json();
    } catch (err: any) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        throw new Error("Neural Link Timeout: The Core is taking too long to respond.");
      }
      throw err;
    }
}

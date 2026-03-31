import { callRaizenAI } from './raizen';
import { pluginRegistry } from '../lib/plugins';
import { ContextOptions } from './contextBuilder';

export interface EngineResponse {
  text: string;
  triggeredProtocols: string[];
}

/**
 * The Central Core Engine of Raizen OS.
 * Processes user input, coordinates with AI, and autonomously executes system protocols.
 */
export async function processMessage(
  input: string,
  config: any,
  messages: any[],
  context: ContextOptions
): Promise<EngineResponse> {
  // 1. Call the AI Brain
  const aiRawResponse = await callRaizenAI(config, [...messages, { sender: 'user', text: input }], context);
  
  if (!aiRawResponse || !aiRawResponse.choices || !aiRawResponse.choices[0]) {
    throw new Error("Neural Link Failure: Absolute silence from the Core.");
  }

  let responseText = aiRawResponse.choices[0].message.content;
  const triggeredProtocols: string[] = [];

  // 2. Parse for Autonomous Execution Tags: [EXECUTE: protocol_id]
  const executeRegex = /\[EXECUTE:\s*([a-zA-Z0-9_-]+)\]/g;
  let match;
  
  while ((match = executeRegex.exec(responseText)) !== null) {
    const protocolId = match[1].trim();
    triggeredProtocols.push(protocolId);
    
    // 3. Autonomous Protocol Activation
    console.log(`[CORE_ENGINE] Autonomously triggering protocol: ${protocolId}`);
    try {
      // We use 'run' as the default action for autonomous triggers
      pluginRegistry.executeAction(protocolId, 'run', { source: 'CORE_ENGINE', context: input });
    } catch (err) {
      console.error(`[CORE_ENGINE] Failed to activate protocol ${protocolId}:`, err);
    }
  }

  // 4. Clean up tags from the user-facing text
  const cleanText = responseText.replace(executeRegex, '').trim();

  return {
    text: cleanText,
    triggeredProtocols
  };
}

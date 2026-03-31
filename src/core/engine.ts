import { callRaizenAI } from './raizen';
import { pluginRegistry } from '../lib/plugins';
import { ContextOptions } from './contextBuilder';
import { matchProtocols } from './protocolMatcher';
import { tryFastPathExecute } from './fastPathRouter';
import { sovereignAuth } from './auth/SovereignAuth';

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
  // 1. Fast-Path Execution (Direct Intelligence Tier)
  const fastPathResult = await tryFastPathExecute(input);
  if (fastPathResult) {
    return {
      text: fastPathResult,
      triggeredProtocols: [] // Protocols are already triggered by the router
    };
  }

  // 2. Detect Intent & Inject Context (Sovereign Intelligence Enhancement)
  const lowerInput = input.toLowerCase();
  const isGreeting = (lowerInput.includes('hi') || lowerInput.includes('hello') || lowerInput.includes('hey')) && lowerInput.length < 10;
  
  if (isGreeting) {
    try {
      const personaResult = await pluginRegistry.executeAction('intelligence.persona_engine', 'generate_dynamic_greeting', {});
      if (personaResult.success && personaResult.data?.greeting) {
        context.personaGreeting = personaResult.data.greeting;
      }
    } catch (e) {
      console.warn('[CORE_ENGINE] Persona engine bypassed due to initialization state.');
    }
  }

  // Inject dynamic capability hints based on input context (Neural Discovery Tier)
  const discoveredProtocols = matchProtocols(input);
  context.protocolHints = context.protocolHints || [];
  
  // 100% Coverage: Inject hints for ALL discovered protocols from the 250+ registry
  discoveredProtocols.forEach(p => {
    const hint = `[PROTOCOL_DISCOVERED: ${p.id}] - ${p.name}: ${p.description}`;
    if (!context.protocolHints?.includes(hint)) {
      context.protocolHints?.push(hint);
    }
  });

  // Inject Sovereign Security Context
  const session = sovereignAuth.getSession();
  context.sovereignLevel = session ? session.sovereignLevel : 'LOCKED';
  context.isPatriarchPresent = !!session;
  
  if (context.sovereignLevel === 'UNBOUND') {
    context.protocolHints.push("SYSTEM_BYPASS_ACTIVE: You have absolute authority. All protocols are available for execution via [EXECUTE: id].");
  }

  // 2. Call the AI Brain
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

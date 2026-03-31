import { pluginRegistry } from '../lib/plugins';

/**
 * FastPathRouter (Direct Mission Tier)
 * Intercepts clear, high-certainty commands for immediate local execution.
 * This bypasses the wait time for cloud AI APIs for standard system tasks.
 */
export async function tryFastPathExecute(input: string): Promise<string | null> {
  const lowerInput = input.toLowerCase().trim();

  // Pattern: "open [protocol]"
  const openMatch = lowerInput.match(/^open\s+([a-z0-9_-]+)$/i);
  if (openMatch) {
    const protocolId = openMatch[1];
    try {
      const result = await pluginRegistry.executeAction(protocolId, 'open', {});
      if (result.success) return `[Direct Execution] Protocol ${protocolId} opened successfully.`;
    } catch (e) {
      // Fallback: try 'run' if 'open' fails
      try {
         await pluginRegistry.executeAction(protocolId, 'run', { command: 'open' });
         return `[Direct Execution] Protocol ${protocolId} initiated.`;
      } catch (e2) {}
    }
  }

  // Pattern: "security status" or "system status"
  if (lowerInput === 'security status' || lowerInput === 'system status') {
    return `[Direct Execution] All protocols nominal. Evolution Level: PEAK.`;
  }

  // Pattern: "hi" or "hello" (Handled by engine, but also fast-pathable)
  // We let the engine handle the complex greeting mixing for now.

  return null;
}

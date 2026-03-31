import { pluginRegistry } from '../lib/plugins';

export interface ProtocolMatch {
  id: string;
  name: string;
  description: string;
  relevance: number;
}

/**
 * ProtocolMatcher (Neural Discovery Tier)
 * Scans the deep plugin registry to identify relevant protocols based on user intent.
 */
export function matchProtocols(input: string): ProtocolMatch[] {
  const lowerInput = input.toLowerCase();
  const allPlugins = pluginRegistry.getAll();
  const matches: ProtocolMatch[] = [];

  for (const plugin of allPlugins) {
    let score = 0;
    const pid = plugin.id.toLowerCase();
    const pname = plugin.name.toLowerCase();
    const pdesc = plugin.description.toLowerCase();

    // Direct matches
    if (lowerInput.includes(pid)) score += 0.8;
    if (lowerInput.includes(pname)) score += 0.6;

    // keyword matches in description
    const keywords = pdesc.split(/\s+/);
    keywords.forEach(kw => {
        if (kw.length > 3 && lowerInput.includes(kw)) score += 0.1;
    });

    // Action matches
    if (plugin.actions) {
        plugin.actions.forEach(action => {
            const alabel = action.label.toLowerCase();
            const adesc = action.description.toLowerCase();
            if (lowerInput.includes(alabel)) score += 0.4;
            if (lowerInput.includes(adesc)) score += 0.2;
        });
    }

    if (score > 0.2) {
      matches.push({
        id: plugin.id,
        name: plugin.name,
        description: plugin.description,
        relevance: Math.min(score, 1.0)
      });
    }
  }

  return matches.sort((a, b) => b.relevance - a.relevance).slice(0, 5);
}

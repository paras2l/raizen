export const SOVEREIGN_PROTOCOLS = [
  'legion', 'paro', 'akasha', 'ghost', 'scholar', 'chronos', 'flux', 'constellation', 
  'memory-harvest', 'predictive-intel', 'spatial-hooks', 'spatial-hud', 'existential-alignment', 'hyper-inference', 'sentient-code', 'universal-context', 'cognitive-mirroring', 'alpha-evolution', 'persona-engine', 'vector-sync', 'skill-synthesis', 'orchestrator-protocol', 'vision-cyclops', 'intelligence-akasha', 'security-hardcode', 'security-vault', 'overclock-protocol', 'singularity-core', 'rccr-brain', 'oracle', 'arbiter', 'mimic', 'sustain', 'mitosis', 'immune', 
  'babel', 'unity', 'guardian', 'aegis', 'prism', 'shroud', 'recall', 'sentinel', 
  'life-line', 'phantom', 'origin', 'honey-swarm', 'void', 'anchor', 'mirage', 
  'empire', 'hype', 'sovereign', 'inner-circle', 'shadow', 'focus', 'equilibrium', 
  'eureka', 'dream', 'synapse', 'aura', 'empathy', 'manifest', 'omni-link', 
  'star', 'cosmos', 'lens', 'zone', 'citadel', 'vital', 'forge', 'tesla', 'gaia', 
  'keys-to-the-city', 'vanguard', 'hela', 'eternal', 'patriarch', 'parallel', 
  'nexus', 'titan', 'aether', 'voyager', 'genesis', 'artisan', 'director', 
  'echo', 'illusionist', 'architect', 'cerebro', 'starlink', 'centurion', 
  'grid', 'paladin', 'apex', 'sanctuary', 'phoenix', 'whatsapp', 'telegram', 
  'discord', 'slack', 'signal', 'imessage', 'matrix', 'nostr', 'msteams', 
  'nextcloud', 'search', 'camera', 'satellite', 'orbital', 'scan', 'nearby', 'hardware',
  'check', 'devices', 'around'
];

export function detectProtocol(input: string): string | undefined {
  const lowerInput = input.toLowerCase();
  return SOVEREIGN_PROTOCOLS.find(p => lowerInput.includes(p));
}

export function classifyIntent(input: string): {
  isAction: boolean;
  isBrowser: boolean;
  isTerminal: boolean;
  isEmail: boolean;
  isOverride: boolean;
} {
  const lowerInput = input.toLowerCase();
  return {
    isAction: /\b(scan|check|open|launch|hack|control|monitor|intercept|activate|send|search|browse|find)\b/.test(lowerInput),
    isBrowser: lowerInput.startsWith('browse') || lowerInput.startsWith('search') || lowerInput.startsWith('find'),
    isTerminal: lowerInput.startsWith('run command') || lowerInput.startsWith('terminal') || lowerInput.startsWith('shell') || lowerInput.startsWith('powershell'),
    isEmail: lowerInput.startsWith('email') || lowerInput.startsWith('mail') || lowerInput.startsWith('send mail') || lowerInput.startsWith('draft'),
    isOverride: lowerInput.startsWith('sovereign override:')
  };
}

export function parseOverride(input: string): { codeword?: string; command?: string } {
  const parts = input.replace(/sovereign override:/i, '').split('::');
  return {
    codeword: parts[0]?.trim(),
    command: parts[1]?.trim()
  };
}

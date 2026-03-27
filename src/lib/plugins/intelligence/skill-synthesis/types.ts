export type SkillCategory = 'scraping' | 'processing' | 'automation' | 'generation';
export type SandboxStatus = 'clean' | 'tainted' | 'error';

export interface SkillManifest {
  id: string;
  name: string;
  category: SkillCategory;
  version: string;
  capabilities: string[];
  permissions: string[];
}

export interface SynthesisGoal {
  id: string;
  userRequest: string;
  requiredCapability: string;
  status: 'pending' | 'generating' | 'testing' | 'deployed';
}

export interface SandboxResult {
  success: boolean;
  output: any;
  latencyMs: number;
  resourceUsage: { cpu: number; memoryMB: number };
  logs: string[];
}

export interface SkillLogEntry {
  timestamp: string;
  event: 'SKILL_PLAN' | 'SKILL_GEN' | 'SANDBOX_TEST' | 'SKILL_DEPLOY';
  details: string;
}

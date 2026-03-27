export interface Prospect {
  id: string;
  name: string;
  role: string;
  company: string;
  socialLinks: string[];
  relevanceScore: number; // 0 to 1
  source: string;
  status: 'new' | 'vetted' | 'outreached' | 'converted' | 'rejected';
  lastInteraction?: string;
}

export interface NicheConfig {
  industries: string[];
  keywords: string[];
  targetLocations: string[];
  maxLeadsPerCycle: number;
}

export interface OutreachCampaign {
  id: string;
  niche: string;
  targets: Prospect[];
  initiatedAt: string;
  successRate: number;
}

export interface AvatarConfig {
  autonomousHunting: boolean;
  niche: NicheConfig;
  outreachTone: 'aggressive' | 'value-first' | 'consultative';
  maxDailyOutreach: number;
}

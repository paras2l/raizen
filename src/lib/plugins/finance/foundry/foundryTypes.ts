export type NicheCategory = 'SaaS' | 'E-commerce' | 'AI-Agency' | 'Digital-Content';

export interface MarketNiche {
  id: string;
  category: NicheCategory;
  trendScore: number; // 0-1
  competitionIndex: number; // 0-1
  estimatedTAM: number; // Total Addressable Market
}

export interface RevenueStream {
  id: string;
  name: string;
  nicheId: string;
  status: 'pre-launch' | 'live' | 'scaling' | 'stable';
  kpis: {
    monthlyRevenue: number;
    userCount: number;
    churnRate: number;
  };
  automationLevel: number; // 0-1
}

export interface LaunchMetrics {
  launchDate: number;
  setupCost: number;
  timeToFirstRevenueDays: number;
}

export interface FoundryAction {
  type: 'scan-niche' | 'create-product' | 'deploy-automation' | 'optimize-kpis';
  payload: any;
}

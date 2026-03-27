export interface MarketSignal {
  id: string;
  source: string;
  type: 'price_drop' | 'new_competitor' | 'rate_shift';
  intensity: number; // 0 to 1
  description: string;
  timestamp: string;
}

export interface CostOption {
  name: string;
  category: string;
  price: number;
  billingCycle: 'monthly' | 'yearly' | 'one-time';
  features: string[];
}

export interface EfficiencyScore {
  toolId: string;
  usageScore: number; // 0 to 1
  costScore: number; // 0 to 1
  roiValue: number;
  recommendation: string;
}

export interface ArbitrageOpportunity {
  id: string;
  title: string;
  savingPotential: string;
  actionRequired: string;
  riskLevel: 'low' | 'medium' | 'high';
}

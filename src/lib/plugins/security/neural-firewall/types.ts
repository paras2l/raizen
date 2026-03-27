export interface IncomingMessage {
  id: string;
  source: 'email' | 'im' | 'system' | 'web';
  content: string;
  sender: string;
  timestamp: string;
}

export interface IntentClassification {
  intent: 'neutral' | 'information_request' | 'persuasion' | 'exploitation' | 'coercion';
  confidence: number;
}

export interface ManipulativeSignal {
  type: 'urgency' | 'authority' | 'threat' | 'financial_bait';
  snippet: string;
  severity: number;
}

export interface RiskScore {
  score: number; // 0.0 to 1.0
  level: 'low' | 'medium' | 'high' | 'critical';
  indicators: string[];
}

export interface FirewallConfig {
  sensitivityThreshold: number;
  autoBlockCritical: boolean;
  enablePsychologicalAnalysis: boolean;
}

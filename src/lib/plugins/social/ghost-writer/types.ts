export interface ToneProfile {
  name: string;
  conciseness: number; // 0 to 1
  formality: number; // 0 to 1
  humorLevel: number; // 0 to 1
  technicalDepth: number; // 0 to 1
  slangUsage: string[];
  signatureEmoji: string[];
  lastUpdated: string;
}

export interface StyleTokens {
  vocalRange: 'authoritative' | 'warm' | 'precise' | 'casual';
  sentenceStructure: 'short-punchy' | 'elaborate-descriptive' | 'list-oriented';
  preferredGreeting: string;
  preferredSignOff: string;
}

export interface DraftSession {
  id: string;
  originalMessage: string;
  draftContent: string;
  toneApplied: string;
  status: 'drafting' | 'completed' | 'approved' | 'rejected';
  createdAt: string;
}

export interface GhostWriterConfig {
  autoAnalyzeTone: boolean;
  minMessageCountForProfile: number;
  requireApprovalBeforeSend: boolean;
  modelPreference: 'paro' | 'claude' | 'gpt4';
}

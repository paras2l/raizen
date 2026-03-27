export type ResearchPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface KnowledgeGap {
  topic: string;
  context: string;
  confidenceScore: number;
  priority: ResearchPriority;
}

export interface ResearchSource {
  title: string;
  url: string;
  type: 'web_article' | 'pdf' | 'video_transcript';
  credibilityScore: number;
}

export interface SynthesizedInsights {
  topic: string;
  summary: string;
  keyFindings: string[];
  sources: ResearchSource[];
}

export interface ScholarConfig {
  maxSourcesPerSearch: number;
  enableVideoTranscription: boolean;
  autonomousMode: boolean;
  vectorSyncEnabled: boolean;
}

export interface WorkspaceState {
  activeFiles: string[];
  openTabs: string[];
  recentTerminalOutput: string;
  notes: string;
}

export interface ConceptSnapshot {
  id: string;
  timestamp: number;
  project?: string;
  topic?: string;
  state: WorkspaceState;
  intent: string;
}

export interface InsightSignal {
  type: 'ACTIVITY_SPIKE' | 'NOTES_RAPID' | 'TAB_CHURN' | 'MANUAL';
  confidence: number;
  timestamp: number;
}

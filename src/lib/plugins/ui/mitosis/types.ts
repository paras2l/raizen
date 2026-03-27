export type WorkflowCategory = 'document' | 'media' | 'coding' | 'system' | 'general';

export interface WorkflowStep {
  actionId: string;
  pluginId: string;
  timestamp: string;
}

export interface WorkflowPattern {
  id: string;
  steps: string[]; // sequence of actionIds
  frequency: number;
  category: WorkflowCategory;
  lastDetected: string;
}

export interface UIShortcut {
  id: string;
  label: string;
  icon?: string;
  workflowId: string;
  status: 'proposed' | 'active' | 'archived';
}

export interface MitosisConfig {
  minPatternFrequency: number;
  maxActiveShortcuts: number;
  autoApproveMacros: boolean;
}

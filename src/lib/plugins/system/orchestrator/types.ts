export type TaskStatus = 'pending' | 'executing' | 'completed' | 'failed' | 'retrying';

export interface TaskNode {
  id: string;
  action: string;
  params: Record<string, any>;
  status: TaskStatus;
  dependencies: string[]; // Node IDs
  result?: any;
  error?: string;
}

export interface WorkflowDefinition {
  id: string;
  name: string;
  tasks: TaskNode[];
  createdAt: string;
}

export interface OrchestrationLogEntry {
  timestamp: string;
  event: 'WORKFLOW_CREATE' | 'TASK_START' | 'TASK_FINISH' | 'WORKFLOW_FAIL';
  details: string;
}

export interface AppConnector {
  id: string;
  name: string;
  actions: string[];
}

export type AgentRole = 'summarizer' | 'researcher' | 'analyst' | 'coder' | 'voter' | 'coordinator';
export type AgentStatus = 'created' | 'running' | 'completed' | 'error' | 'terminated';

export interface SwarmTask {
  id: string;
  description: string;
  payload: any;
  priority: number;
}

export interface SubTask extends SwarmTask {
  parentId: string;
  role: AgentRole;
  assignedAgentId?: string;
}

export interface AgentResult {
  agentId: string;
  subTaskId: string;
  success: boolean;
  data: any;
  error?: string;
  durationMs: number;
}

export interface SwarmConfig {
  maxAgents: number;
  agentTimeoutMs: number;
  retryAttempts: number;
}

export interface SwarmLogEntry {
  timestamp: string;
  event: string;
  agentId?: string;
  role?: AgentRole;
  durationMs?: number;
  details: string;
}

export interface SoftwareApp {
  id: string;
  name: string;
  masteryLevel: number;
  capabilities: string[];
  lastStudyTimestamp: number;
}

export interface RemoteNode {
  id: string;
  location: string;
  availableApps: string[];
  latency: number;
  isSecure: boolean;
}

export interface ArchitectTask {
  id: string;
  appId: string;
  instruction: string;
  status: 'studying' | 'executing' | 'verifying' | 'completed';
  resultUri?: string;
}

export interface ArchitectAction {
  type: 'learn' | 'access-remote' | 'orchestrate' | 'simulate' | 'status';
  payload: any;
}

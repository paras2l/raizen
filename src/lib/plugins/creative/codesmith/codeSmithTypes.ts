export interface SoftwareSpec {
  id: string;
  name: string;
  description: string;
  features: string[];
  techStack: string;
  timestamp: number;
}

export interface Codebase {
  id: string;
  specId: string;
  repositoryUri: string;
  buildStatus: 'pending' | 'compiling' | 'success' | 'failed';
}

export interface DeploymentResult {
  id: string;
  appId: string;
  storeUrl: string;
  status: 'deploying' | 'completed' | 'error';
  version: string;
}

export interface CodeSmithAction {
  type: 'parse' | 'generate' | 'test' | 'deploy' | 'status';
  payload: any;
}

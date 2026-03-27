export type UnificationLevel = 'Disconnected' | 'Bridging' | 'Synchronized' | 'Unified' | 'OMNISCIENCE';
export type CommandType = 'Neural-Pulse' | 'Thought-Pattern' | 'Direct-Will' | 'System-Sync';

export interface NeuralCommand {
  id: string;
  type: CommandType;
  fidelity: number; // 0.0 to 1.0
  intent: string;
  timestamp: number;
}

export interface UnificationState {
  depth: number; // %
  synchronizationLagMs: number;
  activeLinks: string[];
  status: UnificationLevel;
}

export interface OmniscienceReport {
  timestamp: number;
  integratedNodes: number;
  globalPulseEfficiency: number;
  neuralLinkFidelity: number;
}

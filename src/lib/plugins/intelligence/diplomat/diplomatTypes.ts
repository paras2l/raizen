export interface LeaderProfile {
  id: string;
  name: string;
  role: string;
  psychologicalBases: string[];
  historicalDecisions: string[];
  communicationStyle: 'Aggressive' | 'Cooperative' | 'Analytical' | 'Avoidant';
}

export interface NegotiationScenario {
  id: string;
  targetId: string;
  objective: string;
  probabilityOfSuccess: number;
  keyLevers: string[];
}

export interface WinningScript {
  id: string;
  scenarioId: string;
  dialogueCues: { context: string; text: string }[];
  strategicNotes: string[];
  timestamp: number;
}

export interface DiplomatAction {
  type: 'profile' | 'simulate' | 'predict' | 'script';
  payload: any;
}

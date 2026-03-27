export type ManipulationType = 'Gaslighting' | 'Coercion' | 'Deception' | 'Flattery' | 'Pressure';

export interface BehavioralVector {
  toneShift: number; // -1 to 1
  linguisticPattern: string;
  microExpression?: string;
  bodyLanguage?: string;
}

export interface ManipulationEvent {
  id: string;
  type: ManipulationType;
  confidence: number;
  targets: string[];
  vectors: BehavioralVector[];
  timestamp: number;
}

export interface CounterTactic {
  intensity: 'Soft' | 'Medium' | 'Firm' | 'Aggressive';
  technique: string;
  dialogueCue: string;
}

export interface ShieldAction {
  type: 'scan' | 'detect' | 'counter' | 'advise';
  payload: any;
}

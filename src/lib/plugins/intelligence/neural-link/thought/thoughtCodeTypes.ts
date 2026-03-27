export type SupportedLanguage = 'TypeScript' | 'JavaScript' | 'Python' | 'Go' | 'Rust';

export interface ProgrammingIntent {
  id: string;
  source: 'SPOKEN' | 'WRITTEN' | 'WORKFLOW';
  conceptualInput: string;
  timestamp: number;
}

export interface LogicStructure {
  modules: string[];
  functions: string[];
  dataStructures: string[];
  apis: string[];
}

export interface GeneratedCode {
  content: string;
  language: SupportedLanguage;
  version: string;
}

export interface ValidationReport {
  isValid: boolean;
  errors: string[];
  consistencyScore: number;
}

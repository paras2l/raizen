export interface VocalProfile {
  id: string;
  name: string;
  pitch: number;
  tempo: number;
  vibe: 'authoritative' | 'warm' | 'casual' | 'technical' | 'whisper';
  isClone: boolean;
  baseIdentity?: string;
}

export interface VoiceCloneRequest {
  targetId: string;
  sourceUri: string;
  fidelity: 'standard' | 'high' | 'ultra';
}

export interface VocalAnalysis {
  context: string;
  detectedEmotion: string;
  suggestedProfile: string;
  confidence: number;
}

export interface EchoAction {
  type: 'modulate' | 'clone' | 'design' | 'analyze' | 'status';
  payload: any;
}

export interface CinematicScene {
  id: string;
  title: string;
  script: CinematicScript;
  videoUri: string;
  audioUri: string;
  duration: number;
  metadata: Record<string, any>;
  timestamp: number;
}

export interface CinematicScript {
  id: string;
  scenes: SceneBeat[];
  narration?: string;
  dialogues?: string[];
}

export interface SceneBeat {
  timestamp: number;
  description: string;
  visualCues: string[];
  audioCues: string[];
}

export interface DirectorAction {
  type: 'synthesize' | 'render' | 'record-audio' | 'compose-script' | 'status';
  payload: any;
}

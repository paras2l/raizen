export type MediaCategory = 'Gaming' | 'Cinema' | 'Story' | 'Music';

export interface GameStrategy {
  id: string;
  gameTitle: string;
  tactics: string[];
  winRate: number;
  lastUpdated: number;
}

export interface CinematicProject {
  id: string;
  title: string;
  status: 'In-Progress' | 'Rendered' | 'Failed';
  durationSeconds: number;
  vfxComplexity: 'Low' | 'Medium' | 'High' | 'Photorealistic';
}

export interface StoryNode {
  id: string;
  text: string;
  mood: 'Suspense' | 'Epic' | 'Calm' | 'Dark';
  assets: string[]; // Paths to audio/visual files
}

export interface BardAction {
  type: 'avatar-start' | 'render-cinematic' | 'narrate-story' | 'learn-media';
  payload: any;
}

export interface LifeEvent {
  id: string;
  type: 'achievement' | 'challenge' | 'decision' | 'insight';
  description: string;
  impactLevel: number;
  timestamp: number;
}

export interface StoryArc {
  id: string;
  title: string;
  phase: 'Departure' | 'Initiation' | 'Return';
  milestones: string[];
  currentLegend: string;
}

export interface HeroJourneyStage {
  name: string;
  description: string;
  associatedEvents: string[];
}

export interface MythmakerAction {
  type: 'capture' | 'synthesize' | 'map-journey' | 'status';
  payload: any;
}

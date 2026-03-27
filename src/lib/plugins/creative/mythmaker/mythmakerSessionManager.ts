import { StoryArc, HeroJourneyStage } from './mythmakerTypes';
import { mythmakerLogger } from './mythmakerLogger';

export class MythmakerSessionManager {
  private activeArcs: StoryArc[] = [];
  private currentJourney: HeroJourneyStage[] = [];

  updateLegend(arc: StoryArc) {
    this.activeArcs.push(arc);
    mythmakerLogger.log(`Legend updated: "${arc.title}" is now active.`);
  }

  setCurrentJourney(stages: HeroJourneyStage[]) {
    this.currentJourney = stages;
    mythmakerLogger.log('Hero\'s Journey framework synchronized with active life events.');
  }

  getLatestArc(): StoryArc | undefined {
    return this.activeArcs[this.activeArcs.length - 1];
  }

  getJourneyStages(): HeroJourneyStage[] {
    return this.currentJourney;
  }
}

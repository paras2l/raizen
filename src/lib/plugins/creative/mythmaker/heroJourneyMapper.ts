import { LifeEvent, HeroJourneyStage } from './mythmakerTypes';
import { mythmakerLogger } from './mythmakerLogger';

export class HeroJourneyMapper {
  mapEventsToJourney(events: LifeEvent[]): HeroJourneyStage[] {
    mythmakerLogger.journey('Mapping life events to the Hero\'s Journey framework...');
    
    const stages: HeroJourneyStage[] = [
      {
        name: 'The Call to Adventure',
        description: 'The moment the sovereign realized their potential.',
        associatedEvents: events.filter(e => e.type === 'insight').map(e => e.id),
      },
      {
        name: 'Crossing the Threshold',
        description: 'The first major decision into the unknown.',
        associatedEvents: events.filter(e => e.type === 'decision').map(e => e.id),
      },
      {
        name: 'The Road of Trials',
        description: 'Facing the challenges of the digital expanse.',
        associatedEvents: events.filter(e => e.type === 'challenge').map(e => e.id),
      }
    ];

    mythmakerLogger.success('Hero Journey mapped: Structural integrity confirmed.');
    return stages;
  }
}

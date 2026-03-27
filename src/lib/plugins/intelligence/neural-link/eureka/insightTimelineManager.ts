import { ConceptSnapshot } from './eurekaTypes';
import { eurekaLogger } from './eurekaLogger';

export class InsightTimelineManager {
  private timeline: ConceptSnapshot[] = [];

  public async addToTimeline(snapshot: ConceptSnapshot) {
    this.timeline.push(snapshot);
    await eurekaLogger.log('Milestone added to insight timeline', { timestamp: snapshot.timestamp });
  }

  public getTimeline(): ConceptSnapshot[] {
    return this.timeline.sort((a, b) => b.timestamp - a.timestamp);
  }
}

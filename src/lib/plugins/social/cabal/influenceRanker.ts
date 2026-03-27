import { CabalActor, PowerMap, InfluenceEdge } from './cabalTypes';
import { cabalLogger } from './cabalLogger';
import { cabalConfig } from './cabalConfig';

export class InfluenceRanker {
  rankActors(actors: CabalActor[]): CabalActor[] {
    cabalLogger.log('Calculating real-world influence scores (Alpha-Weighting active)...');
    
    return actors
      .filter(a => a.realInfluenceScore >= cabalConfig.minInfluenceThreshold)
      .sort((a, b) => b.realInfluenceScore - a.realInfluenceScore);
  }

  generateMap(city: string, actors: CabalActor[], edges: InfluenceEdge[]): PowerMap {
    cabalLogger.map(`Synthesizing definitive power map for ${city}.`);
    
    return {
      city,
      topBrokers: this.rankActors(actors),
      hiddenAlliances: edges,
      timestamp: Date.now(),
    };
  }
}

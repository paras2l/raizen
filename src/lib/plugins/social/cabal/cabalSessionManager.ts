import { PowerMap } from './cabalTypes';
import { cabalLogger } from './cabalLogger';

export class CabalSessionManager {
  private localMaps: Map<string, PowerMap> = new Map();

  startSession() {
    cabalLogger.log('Influence mapping session active.');
  }

  logMap(map: PowerMap) {
    this.localMaps.set(map.city, map);
    cabalLogger.log(`Archived power map for ${map.city}. Actors: ${map.topBrokers.length}.`);
  }

  getMap(city: string): PowerMap | undefined {
    return this.localMaps.get(city);
  }
}

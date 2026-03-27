import { InterceptedData, SatelliteImagery } from './strategistTypes';
import { strategistLogger } from './strategistLogger';

export class StrategistSessionManager {
  private intercepts: InterceptedData[] = [];
  private imagery: SatelliteImagery[] = [];

  startSession() {
    strategistLogger.log('Signal dominance session active.');
  }

  logIntercept(data: InterceptedData) {
    this.intercepts.push(data);
    strategistLogger.log(`Archived intercept from ${data.source}. Type: ${data.type}`);
  }

  logImagery(img: SatelliteImagery) {
    this.imagery.push(img);
    strategistLogger.log(`Archived imagery from ${img.constellation}. Resolution: ${img.resolution}`);
  }

  getRecentIntercepts(): InterceptedData[] {
    return this.intercepts.slice(-10);
  }
}

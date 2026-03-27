import { WinningScript, NegotiationScenario } from './diplomatTypes';
import { diplomatLogger } from './diplomatLogger';

export class DiplomatSessionManager {
  private scriptLibrary: WinningScript[] = [];

  startSession() {
    diplomatLogger.log('Predictive diplomacy session active.');
  }

  saveScript(script: WinningScript) {
    this.scriptLibrary.push(script);
    diplomatLogger.log(`Winning script archived: ${script.id}`);
  }

  getScripts(): WinningScript[] {
    return this.scriptLibrary;
  }
}

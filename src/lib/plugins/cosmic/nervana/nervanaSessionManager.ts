import { NervanaMitigation } from './nervanaTypes';
import { nervanaLogger } from './nervanaLogger';

export class NervanaSessionManager {
  private mitigations: NervanaMitigation[] = [];

  logMitigation(mitigation: NervanaMitigation) {
    this.mitigations.push(mitigation);
    nervanaLogger.log(`Cosmic event mitigation logged: ${mitigation.event.id}`);
  }

  getHistory(): NervanaMitigation[] {
    return this.mitigations;
  }
}

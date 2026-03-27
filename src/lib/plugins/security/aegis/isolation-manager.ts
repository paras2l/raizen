import { IsolationAction } from './types';

export class ThreatIsolationManager {
  isolate(action: IsolationAction) {
    console.log(`[AEGIS-ISOLATE] CONTAINMENT ACTIVE: ${action.type} applied to ${action.targetId}. Reason: ${action.reason}`);
    return true;
  }
}

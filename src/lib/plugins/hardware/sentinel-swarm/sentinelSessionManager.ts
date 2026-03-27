import { SentinelSession, SentinelUnit } from './sentinelTypes';
import { sentinelLogger } from './sentinelLogger';

export class SentinelSessionManager {
  private swarm: Map<string, SentinelUnit> = new Map();
  private session: SentinelSession | null = null;

  public async initiateDefense(): Promise<string> {
    this.session = { id: `SENTINEL_${Date.now()}`, active: true, startTime: Date.now(), threatsNeutralized: 0, swarmHealth: 100 };
    await sentinelLogger.log(`Sentinel kinetic defense session [${this.session.id}] initiated.`);
    return this.session.id;
  }

  public async updateUnit(unit: SentinelUnit): Promise<void> {
    this.swarm.set(unit.id, unit);
  }

  public getSwarmStatus(): SentinelUnit[] {
    return Array.from(this.swarm.values());
  }
}

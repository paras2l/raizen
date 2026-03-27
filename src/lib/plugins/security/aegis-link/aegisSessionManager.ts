import { DetectedEntity, AegisSession } from './aegisTypes';
import { aegisLogger } from './aegisLogger';

export class AegisSessionManager {
  private entities: Map<string, DetectedEntity> = new Map();
  private session: AegisSession | null = null;

  public async startSession(): Promise<string> {
    this.session = { id: `AEGIS_${Date.now()}`, active: true, startTime: Date.now(), entitiesTracked: 0 };
    await aegisLogger.log(`Aegis situational awareness session [${this.session.id}] active.`);
    return this.session.id;
  }

  public async trackEntity(entity: DetectedEntity): Promise<void> {
    this.entities.set(entity.id, entity);
    if (this.session) this.session.entitiesTracked = this.entities.size;
    await aegisLogger.log(`[AEGIS] Entity detected: ${entity.id} (${entity.classification}) at ${entity.distance}m.`);
  }

  public getNearbyEntities(): DetectedEntity[] {
    return Array.from(this.entities.values());
  }
}

import { DigitalEntity } from './metaTypes';
import { metaLogger } from './metaLogger';

export class DigitalOverlayRenderer {
  public async renderEntity(entity: DigitalEntity): Promise<void> {
    await metaLogger.log(`Projecting digital entity ${entity.entityId} Type: ${entity.type} into the physical world at resolution: 8K`);
  }

  public async worldLockEntity(entityId: string): Promise<void> {
    await metaLogger.log(`Anchoring digital entity ${entityId} to physical spatial coordinates.`);
  }
}

import { RepairMission } from './helaTypes';
import { helaLogger } from './helaLogger';

export class RepairScheduler {
  public async scheduleRepair(mission: RepairMission): Promise<void> {
    await helaLogger.log(`Scheduling repair [${mission.id}] for low-operational window.`);
  }
}

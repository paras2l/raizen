import { RepairMission, HardwareComponent } from './helaTypes';
import { helaLogger } from './helaLogger';

export class HelaSessionManager {
  private activeMissions: Map<string, RepairMission> = new Map();
  private components: Map<string, HardwareComponent> = new Map();

  public async trackMission(mission: RepairMission): Promise<void> {
    this.activeMissions.set(mission.id, mission);
    await helaLogger.log(`Repair mission [${mission.id}] for [${mission.targetComponentId}] is ${mission.status}.`);
  }

  public getIntegrityReport(): HardwareComponent[] {
    return Array.from(this.components.values());
  }

  public registerComponent(component: HardwareComponent): void {
    this.components.set(component.id, component);
  }
}

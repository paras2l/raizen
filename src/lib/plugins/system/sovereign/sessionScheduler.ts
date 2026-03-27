import { SessionMission, TaskMode } from './sovereignTypes';
import { sovereignLogger } from './sovereignLogger';

export class SessionScheduler {
  private activeMissions: Map<string, SessionMission> = new Map();

  startMission(id: string, title: string, mode: TaskMode): SessionMission {
    const mission: SessionMission = {
      id,
      title,
      mode,
      startTime: Date.now(),
      status: 'Active'
    };
    this.activeMissions.set(id, mission);
    sovereignLogger.log(`Mission started: ${title} (${mode})`);
    return mission;
  }

  endMission(id: string) {
    const mission = this.activeMissions.get(id);
    if (mission) {
      mission.status = 'Completed';
      mission.endTime = Date.now();
      sovereignLogger.log(`Mission completed: ${mission.title}. All assets reverting to standby.`);
    }
  }
}

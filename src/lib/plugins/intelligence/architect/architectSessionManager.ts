import { ArchitectTask, SoftwareApp } from './architectTypes';
import { architectLogger } from './architectLogger';

export class ArchitectSessionManager {
  private masteredApps = new Map<string, SoftwareApp>();
  private activeTasks = new Map<string, ArchitectTask>();

  registerApp(app: SoftwareApp) {
    this.masteredApps.set(app.id, app);
    architectLogger.log(`App added to mastery database: ${app.name}`);
  }

  registerTask(task: ArchitectTask) {
    this.activeTasks.set(task.id, task);
    architectLogger.log(`Task registered: ${task.id} [${task.instruction}]`);
  }

  getMasteredApps(): SoftwareApp[] {
    return Array.from(this.masteredApps.values());
  }

  getActiveTasks(): ArchitectTask[] {
    return Array.from(this.activeTasks.values());
  }
}

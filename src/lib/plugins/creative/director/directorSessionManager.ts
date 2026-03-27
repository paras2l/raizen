import { CinematicScene } from './directorTypes';
import { directorLogger } from './directorLogger';

export class DirectorSessionManager {
  private activeJobs = new Map<string, CinematicScene>();

  registerJob(scene: CinematicScene) {
    this.activeJobs.set(scene.id, scene);
    directorLogger.log(`Job registered: ${scene.id}`);
  }

  completeJob(id: string) {
    this.activeJobs.delete(id);
    directorLogger.log(`Job complete: ${id}`);
  }

  getActiveJobs(): CinematicScene[] {
    return Array.from(this.activeJobs.values());
  }
}

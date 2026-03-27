import { WorkflowStep } from './types';

export class WorkflowTracker {
  private sessionLog: WorkflowStep[] = [];

  trackAction(pluginId: string, actionId: string) {
    const step = { pluginId, actionId, timestamp: new Date().toISOString() };
    this.sessionLog.push(step);
    console.log(`[MITOSIS-TRACKER] Action recorded: ${pluginId}.${actionId}`);
    
    // Maintain window of last 50 actions
    if (this.sessionLog.length > 50) this.sessionLog.shift();
  }

  getRecentHistory(): WorkflowStep[] {
    return this.sessionLog;
  }
}

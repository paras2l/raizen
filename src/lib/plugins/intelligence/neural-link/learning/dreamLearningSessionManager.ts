import { RetentionLog, ReinforcementSession } from './dreamLearningTypes';
import { dreamLearningLogger } from './dreamLearningLogger';

export class DreamLearningSessionManager {
  private retentionLogs: Record<string, RetentionLog> = {};
  private activeSessions: ReinforcementSession[] = [];

  public trackSession(session: ReinforcementSession) {
    this.activeSessions.push(session);
  }

  public async recordRetention(topicId: string, score: number) {
    this.retentionLogs[topicId] = {
      topicId,
      score,
      lastReview: Date.now()
    };
    
    await dreamLearningLogger.retention(topicId, score);
  }

  public getProgressReport() {
    return Object.values(this.retentionLogs).map(log => ({
        topicId: log.topicId,
        retentionScore: log.score,
        ageDays: (Date.now() - log.lastReview) / 86400000
    }));
  }
}

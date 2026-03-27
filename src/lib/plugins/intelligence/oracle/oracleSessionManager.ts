import { StrategicInsight } from './oracleTypes';
import { oracleLogger } from './oracleLogger';

export class OracleSessionManager {
  private insightLogs: StrategicInsight[] = [];

  startSession() {
    oracleLogger.log('Global intelligence synthesis session active.');
  }

  logInsights(insights: StrategicInsight[]) {
    this.insightLogs.push(...insights);
    if (this.insightLogs.length > 1000) this.insightLogs.splice(0, insights.length);
  }

  getRecentInsights(): StrategicInsight[] {
    return this.insightLogs.slice(-10);
  }
}

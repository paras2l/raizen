import { nexusLogger } from './nexusLogger';
import { ThreatBroadcast, ThreatLevel } from './nexusTypes';
import { nexusConfig } from './nexusConfig';

export class ThreatSyncEngine {
  private threatHistory: ThreatBroadcast[] = [];
  private currentCollectiveThreat: ThreatLevel = 'LOW';

  async syncThreats(): Promise<void> {
    nexusLogger.log('Synchronizing collective intelligence across planetary mesh...');
    
    // Simulate aggregating threats from other nodes
    const simulatedBroadcast: ThreatBroadcast = {
      id: `TB-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      sourceNodeId: 'SN-EURO-01',
      timestamp: Date.now(),
      level: 'ELEVATED',
      pattern: 'SYSTEMIC-OS-PROBING',
      evidence: { targetCount: 142 }
    };

    this.threatHistory.push(simulatedBroadcast);
    this.calculateConsensus();
    nexusLogger.sync(`${this.threatHistory.length} broadcasts processed. Consensus: [${this.currentCollectiveThreat}]`);
  }

  private calculateConsensus(): void {
    // Basic logic: if any HIGH/SYSTEMIC threat is reported by trusted nodes, escalate
    const highThreats = this.threatHistory.filter(b => b.level === 'HIGH' || b.level === 'SYSTEMIC');
    if (highThreats.length >= nexusConfig.minConsensusNodes) {
      this.currentCollectiveThreat = 'HIGH';
      nexusLogger.broadcast(this.currentCollectiveThreat, highThreats[0].id);
    }
  }

  getCurrentThreat(): ThreatLevel {
    return this.currentCollectiveThreat;
  }
}

export const threatSyncEngine = new ThreatSyncEngine();

import { RaizenPlugin, ActionResult } from '../../types';
import { HealthMonitor } from './health-monitor';
import { AnomalyDetector } from './anomaly-detector';
import { QuarantineManager } from './quarantine-manager';
import { RepairEngine } from './repair-engine';
import { SystemIntegrityVerifier } from './integrity-verifier';
import { PerformanceAnalyzer } from './performance-analyzer';
import { ImmunePolicyGuard } from './policy-guard';
import { SystemHealth } from './types';

export class ImmuneSystemPlugin implements RaizenPlugin {
  id = 'immune-system';
  name = 'Predictive Self-Repair (Immune)';
  description = 'Automated quarantine and repair of self-written features that cause instability.';
  status: 'online' | 'offline' | 'connecting' | 'error' = 'online';

  private monitor = new HealthMonitor();
  private detector = new AnomalyDetector();
  private quarantineManager = new QuarantineManager();
  private repairEngine = new RepairEngine();
  private verifier = new SystemIntegrityVerifier();
  private analyzer = new PerformanceAnalyzer();
  private policyGuard = new ImmunePolicyGuard();

  actions = [
    {
      id: 'quarantine-module',
      label: 'Quarantine Module',
      description: 'Isolate a unstable or suspicious feature.',
      category: 'system' as any,
      sensitive: true
    },
    {
      id: 'repair-feature',
      label: 'Repair Feature',
      description: 'Perform automated fixes on a quarantined module.',
      category: 'system' as any,
      sensitive: true
    },
    {
      id: 'get-health-status',
      label: 'Health Status',
      description: 'Retrieve real-time system integrity metrics.',
      category: 'system' as any,
      sensitive: false
    },
    {
      id: 'verify-policy',
      label: 'Verify Policy',
      description: 'Check if a specific path violates core OS immutability policies.',
      category: 'system' as any,
      sensitive: false
    }
  ];

  async initialize(): Promise<void> {
    console.log('[IMMUNE] Self-repair system active. Boundaries immutable.');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    switch (actionId) {
      case 'quarantine-module':
        this.quarantineManager.quarantine(params.id, params.reason || 'Anomalous behavior');
        return { success: true, data: { moduleId: params.id, status: 'QUARANTINED' } };
      case 'repair-feature':
        const fixed = await this.repairEngine.attemptRepair(params.id);
        return { success: true, data: { moduleId: params.id, repaired: fixed } };
      case 'get-health-status':
        const health = await this.monitor.getSnapshot();
        const coreSolid = this.verifier.verifyCore();
        health.isCoreValid = coreSolid;
        
        // Enhance with performance analysis if module IDs provided
        if (params.moduleIds) {
          health.moduleEfficiency = params.moduleIds.map((id: string) => ({
            id,
            score: this.analyzer.analyzeModule(id)
          }));
        }

        return { success: true, data: health };
      case 'verify-policy':
        const allowed = this.policyGuard.canModify(params.path);
        return { success: true, data: { path: params.path, allowed } };
      case 'auto-monitor': {
        const health = await this.monitor.getSnapshot();
        // Simple logic: if failure rate > 5%, trigger alert
        if (health.failureRate > 0.05) {
           console.warn(`[IMMUNE] Critical health drop detected: ${health.failureRate * 100}% failure rate.`);
        }
        return { success: true, data: health };
      }
      default:
        return { success: false, error: 'Unknown action' };
    }
  }
}

export const immuneSystem = new ImmuneSystemPlugin();

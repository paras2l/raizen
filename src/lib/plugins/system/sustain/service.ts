import { RaizenPlugin, ActionResult } from '../../types';
import { EnergyPolicyManager } from './policy-manager';
import { BatteryStateAnalyzer } from './state-analyzer';
import { PowerOptimizationEngine } from './optimization-engine';
import { AgentThrottleController } from './throttle-controller';
import { ModelSwitcher } from './model-switcher';
import { EnergyMetrics } from './types';

export class SustainPlugin implements RaizenPlugin {
  id = 'sustain-protocol';
  name = 'Energy-Aware Reasoning (Sustain)';
  description = 'Monitors device battery and energy grid to optimize computational load.';
  status: 'online' | 'offline' | 'connecting' | 'error' = 'online';

  private policyManager = new EnergyPolicyManager();
  private analyzer = new BatteryStateAnalyzer();
  private optimizer = new PowerOptimizationEngine();
  private throttleController = new AgentThrottleController();
  private modelSwitcher = new ModelSwitcher();

  actions = [
    {
      id: 'optimize-power',
      label: 'Optimize Power',
      description: 'Thin the active swarm or switch to low-power models based on battery levels.',
      category: 'system' as any,
      sensitive: false
    },
    {
      id: 'grid-status',
      label: 'Grid Status',
      description: 'Check local and global energy availability for high-load tasks.',
      category: 'system' as any,
      sensitive: false
    }
  ];

  async initialize(): Promise<void> {
    console.log('[SUSTAIN] Energy awareness protocol synchronized.');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    switch (actionId) {
      case 'optimize-power': {
        const metrics: EnergyMetrics = {
          batteryLevel: params.battery / 100,
          isCharging: params.charging || false
        };
        
        const policy = this.policyManager.getPolicy();
        const state = this.analyzer.analyze(metrics, policy);
        const rule = this.optimizer.getRule(state);

        // Apply optimizations
        this.throttleController.throttle(rule.maxAgents);
        this.modelSwitcher.switchModel(rule.modelTier);

        return { 
          success: true, 
          data: { 
            powerMode: state, 
            ruleApplied: rule,
            throttling: state !== 'FULL_POWER' && state !== 'NORMAL'
          } 
        };
      }
      case 'grid-status':
        return { success: true, data: { gridSource: 'SOLAR', availability: 0.88 } };
      default:
        return { success: false, error: 'Unknown action' };
    }
  }
}
